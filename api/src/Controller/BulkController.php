<?php


namespace App\Controller;


use Conduction\CommonGroundBundle\Service\CommonGroundService;
use Conduction\CommonGroundBundle\Service\PtcService;
use Conduction\CommonGroundBundle\Service\VrcService;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\Request;
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
    /**
     *
     * @Template
     * @Route("/")
     */
    public function fileAction(
        Request $request
    ) {
        $variables = [];

        if ($request->isMethod('POST')) {
            $files = $request->files->all();
            if (count($files) > 0) {
                foreach ($files as $key=>$file) {
                    $mime = $file->getClientMimeType();
                    if($mime == 'application/vnd.ms-excel' || $mime == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
                        $dir = dirname(__FILE__, 3)."/var";
                        $file->move($dir, $file->getFileName());
                        $reader = new Xlsx();
                        $reader->setReadDataOnly(true);
                        $xlsx = $reader->load("$dir/{$file->getFileName()}");

                        $sheets = $xlsx->getAllSheets();

                        foreach($sheets as $sheet){
                            $rows = $sheet->toArray();
                            foreach($rows as $key=>$row){
                                echo "Row $key - Voornaam: {$row[0]}, achternaam: {$row[1]}, e-mailadres: {$row[2]}<br>";
                            }
                        }
                        unlink("$dir/{$file->getFileName()}");
                    }
                }
            }

        }


        return $variables;
    }
}
