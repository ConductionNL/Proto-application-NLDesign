<?php


namespace App\Controller;


use Conduction\CommonGroundBundle\Service\CommonGroundService;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\Flash\FlashBagInterface;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class BulkController
 * @package App\Controller
 *
 * @Route("/bulk")
 */
class BulkController extends AbstractController
{

    private $flash;
    private $commonGroundService;
    private $params;

    public function __construct(FlashBagInterface $flash, CommonGroundService $commonGroundService, ParameterBagInterface $params)
    {
        $this->flash = $flash;
        $this->commonGroundService = $commonGroundService;
        $this->params = $params;
    }

    /**
     *
     * @Template
     * @Route("/")
     */
    public function fileAction(Request $request, CommonGroundService $commonGroundService) {
        $variables = [];

        if ($request->isMethod('POST')) {
            $files = $request->files->all();
            if (count($files) > 0) {
                $excel = '<table>';
                foreach ($files as $key=>$file) {
                    $mime = $file->getClientMimeType();
                    if($mime == 'application/vnd.ms-excel' || $mime == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || $mime = 'application/octet-stream'){
                        $dir = dirname(__FILE__, 3)."/var";
                        $file->move($dir, $file->getFileName());
                        $reader = new Xlsx();
                        $reader->setReadDataOnly(true);
                        $xlsx = $reader->load("$dir/{$file->getFileName()}");

                        $sheets = $xlsx->getAllSheets();

                        $excel = $this->CheckSheets($sheets, $excel);

                        unlink("$dir/{$file->getFileName()}");
                    }
                }
                $filename = dirname(__FILE__, 3)."/var/file.xls";
                $reader = new \PhpOffice\PhpSpreadsheet\Reader\Html();
                $spreadsheet = $reader->loadFromString($excel);
                $spreadsheet->getDefaultStyle()->getAlignment()->setWrapText(true);
                $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xls');
                header('Content-Type: application/vnd.ms-excel');
                header('Content-Disposition: attachment; filename="file.xls"');
                $writer->save($filename);
                flush();
                readfile($filename);
                unlink($filename); // deletes the temporary file
            }

        }

        return $variables;
    }

    public function CheckSheets($sheets, $excel) {
        foreach($sheets as $sheet){
            $rows = $sheet->toArray();

            if (count($rows) > 1000){
                $this->flash->add('error', 'maximum of 1000 rows exceeded!');
                return;
            }

            $excel = $this->CheckRows($rows, $excel);

        }
        return $excel;
    }

    public function CheckRows($rows, $excel){
        foreach($rows as $key=>$row){
            $excel.= '<tr>';
            //check if email is valid
            if (isset($row[1]) && filter_var($row[1], FILTER_VALIDATE_EMAIL)) {
                $users = $this->commonGroundService->getResourceList(['component' => 'uc', 'type' => 'users'],['username' => $row[1]])['hydra:member'];

                if (count($users) < 1) {
                    //create person
                    $person = [];
                    if (!isset($row[0]) && isset($row[1])){
                        $name = explode('@', $row[1]);
                        $person['givenName'] = $name[0];
                        $excel.= "<td></td>";
                    } else {
                        $excel.= "<td style='background-color: green;'>{$row[0]}</td>";
                        $person['givenName'] = $row[0];
                    }
                    $emailObject = [];
                    $emailObject['name'] = $row[1];
                    $emailObject['email'] = $row[1];
                    $person['emails'] = [$emailObject];
                    $person = $this->commonGroundService->createResource($person, ['component' => 'cc', 'type' => 'people']);

                    //create user
                    $user = [];
                    $user['username'] = $row[1];
                    $validChars = '0123456789abcdefghijklmnopqrstuvwxyz';
                    $password = substr(str_shuffle(str_repeat($validChars, ceil(3 / strlen($validChars)))), 1, 8);
                    $user['password'] = (string) $password;
                    $user['person'] = $person['@id'];
                    $application = $this->commonGroundService->getResource(['component'=>'wrc', 'type'=>'applications', 'id'=>$this->params->get('app_id')]);
                    $organization = $this->commonGroundService->cleanUrl(['component' => 'wrc', 'type' => 'organizations', 'id' => $application['organization']['id']]);
                    $user['organization'] = $organization;
                    $excel.= "<td style='background-color: green;'>{$row[1]}</td>";
                    if (isset($row[2])) {
                        $groups = $this->commonGroundService->getResourceList(['component' => 'uc', 'type' => 'groups'],['code' => $row[2]])['hydra:member'];
                        if (count($groups) > 0){
                            $excel.= "<td style='background-color: green;'>{$row[2]}</td>";
                        } else {
                            $excel.= "<td style='background-color: red;'>{$row[2]}</td>";
                        }
                        $groupId = $this->GetGroup($row[2]);
                    } else {
                        $groupId = $this->GetGroup('users');
                    }
                    $user['userGroups'][] = '/groups/'.$groupId;
                    $user = $this->commonGroundService->createResource($user, ['component' => 'uc', 'type' => 'users']);

                } else {
                    //user found but is there a group set?
                    $user = $users[0];
                    if (isset($row[2])) {
                        //excel info
                        if (isset($row[0])) {
                            $excel.= "<td style='background-color: lightblue;'>{$row[0]}</td>";
                        } else {
                            $excel.= "<td></td>";
                        }
                        $excel.= "<td style='background-color: lightblue;'>{$row[1]}</td>";
                        $groups = $this->commonGroundService->getResourceList(['component' => 'uc', 'type' => 'groups'],['code' => $row[2]])['hydra:member'];
                        if (count($groups) > 0){
                            $excel.= "<td style='background-color: green;'>{$row[2]}</td>";
                        } else {
                            $excel.= "<td style='background-color: red;'>{$row[2]}</td>";
                        }

                        //add group to user
                        $groupId = $this->GetGroup($row[2]);
                        $user['userGroups'][] = '/groups/'.$groupId;
                        unset($user['dateCreated']);
                        unset($user['dateModified']);
                        $this->commonGroundService->updateResource($user);

                    } else {
                        //no group defined and user already exists
                        if (isset($row[0])) {
                            $excel.= "<td style='background-color: lightblue;'>{$row[0]}</td>";
                        } else {
                            $excel.= "<td></td>";
                        }
                        $excel.= "<td style='background-color: lightblue;'>{$row[1]}</td>";
                    }
                }
            } else {
                //no valid email given
                if (isset($row[0])) {
                    $excel.= "<td style='background-color: red;'>{$row[0]}</td>";
                } else {
                    $excel.= "<td></td>";
                }
                $excel.= "<td style='background-color: red;'>{$row[1]}</td>";
            }
            $excel.= "</tr>";
        }
        return $excel;
    }

    public function GetGroup($group) {
        $groups = $this->commonGroundService->getResourceList(['component' => 'uc', 'type' => 'groups'],['code' => $group])['hydra:member'];
        if (count($groups) > 0){
            return $groups[0]['id'];
        } else {
            $groups = $this->commonGroundService->getResourceList(['component' => 'uc', 'type' => 'groups'],['code' => 'users'])['hydra:member'];
            return $groups[0]['id'];
        }
    }
}
