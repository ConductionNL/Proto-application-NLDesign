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
//                $html = '<table>';
                foreach ($files as $key=>$file) {
                    $mime = $file->getClientMimeType();
                    if($mime == 'application/vnd.ms-excel' || $mime == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || $mime = 'application/octet-stream'){
                        $dir = dirname(__FILE__, 3)."/var";
                        $file->move($dir, $file->getFileName());
                        $reader = new Xlsx();
                        $reader->setReadDataOnly(true);
                        $xlsx = $reader->load("$dir/{$file->getFileName()}");

                        $sheets = $xlsx->getAllSheets();

                        $this->CheckSheets($sheets);

                        unlink("$dir/{$file->getFileName()}");

//                        $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
//                        $filename = dirname(__FILE__, 3)."/var/spreadsheet.xlsx";
//                        $writer->save($filename);
//                        header('Content-Type: application/vnd.ms-excel');
//                        header('Content-Disposition: attachment; filename=spreadsheet.xlsx');
//                        readfile($filename);
//                        unlink($filename); // deletes the temporary file
                    }
                }
            }

        }

        return $variables;
    }

    public function CheckSheets($sheets) {
        foreach($sheets as $sheet){
            $rows = $sheet->toArray();

            if (count($rows) > 1000){
                $this->flash->add('error', 'maximum of 1000 rows exceeded!');
                return;
            }

            $this->CheckRows($rows);

        }
    }

    public function CheckRows($rows){
        foreach($rows as $key=>$row){

            //check if email is valid
            if (isset($row[1]) && filter_var($row[1], FILTER_VALIDATE_EMAIL)) {
                $users = $this->commonGroundService->getResourceList(['component' => 'uc', 'type' => 'users'],['username' => $row[1]])['hydra:member'];

                if (!count($users) > 0) {
                    //create person
                    $person = [];
                    if (!isset($row[0]) && isset($row[1])){
                        $name = explode('@', $row[1]);
                        $person['givenName'] = $name[0];
                    } else {
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
                    $ogranization = $this->commonGroundService->cleanUrl(['component' => 'wrc', 'type' => 'organizations', 'id' => $application['organization']['id']]);
                    $user['organization'] = $ogranization;
                    if (isset($row[2])) {
                        $groupId = $this->GetGroup($row[2]);
                    } else {
                        $groupId = $this->GetGroup('users');
                    }
                    $user['userGroups'] = [
                        '/groups/'.$groupId,
                    ];
                    $user = $this->commonGroundService->createResource($user, ['component' => 'uc', 'type' => 'users']);
                } else {
                    $user = $users[0];
                    if (!isset($user['userGroups']) || isset($row[2])) {
                        if (isset($row[2])) {
                            $groupId = $this->GetGroup($row[2]);
                        } else {
                            $groupId = $this->GetGroup('users');
                        }

                        $user['userGroups'] = [
                            '/groups/'.$groupId,
                        ];
                        unset($user['dateCreated']);
                        $this->commonGroundService->updateResource($user);

                    } else {
                        //@todo change email cell to indicate excisting user and usergroup.
                    }
                    //@todo change email cell to indicate excisting user.
                }

            } else {
                //@todo set email cell to red to indicate an error.
            }

            //temp code for visual feedback
            if (!isset($row[0]) && isset($row[1])){
                $name = explode('@', $row[1]);
                echo "Row $key - naam: {$name[0]}, email: {$row[1]}<br>";
            } else {
                echo "Row $key - naam: {$row[0]}, email: {$row[1]}<br>";
            }
        }
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
