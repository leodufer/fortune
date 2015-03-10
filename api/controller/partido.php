<?php 
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Silex\Application;

$app->get('/partido', function(){
    $cotizaciones = R::findAll('partidos');
    
    $res = array();
    foreach ($cotizaciones as $c) {
        $ea = R::load('equipos',$c->teama);
        $eb = R::load('equipos',$c->teamb);
        $r = array(
               'id'=>$c->id,
               'teama'=>$c->teama,
               'teamaname'=>$ea->nombre,
               'teamb'=>$c->teamb,
               'teambname'=>$eb->nombre,
               'estado'=>$c->estado
            );
        $res[] = $r;
    }

    return new Response(json_encode($res), 200); 
});

$app->post('/partido', function(Request $request){
    
    $c = R::dispense('partidos');
    $c->teama = $request->get('teama');
    $c->teamb = $request->get('teamb');
    $c->estado = 'activo';
    $id = R::store($c);
    $ea = R::load('equipos',$c->teama);
    $eb = R::load('equipos',$c->teamb);
    $r = array(
            'id'=>$c->id,
            'teama'=>$c->teama,
            'teamaname'=>$ea->nombre,
            'teamb'=>$c->teamb,
            'teambname'=>$eb->nombre,
            'estado'=>$c->estado
        );
    return new Response(json_encode(array($r)), 201);
    
});
