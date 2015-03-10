<?php 
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Silex\Application;

$app->get('/equipo',function(Request $request){
    $equipos = R::findAll('equipos');
    
    $res = array();
    foreach ($equipos as $e) {
        $r = array(
               'id'=>$e->id,
               'nombre'=>$e->nombre
               );
        $res[] = $r;
    }

    return new Response(json_encode($res), 200); 
});

$app->get('/equipo/{id}',function(Request $request, $id){
    
   $equipo = R::load('equipos',$id);
   echo $equipo;
});

$app->post('/equipo',function(Request $request){
    $c = R::dispense('equipos');
    $c->nombre = $request->get('nombre');
  
    $id = R::store($c);
    $r = array(
            'id'=>$c->id,
            'nombre'=>$c->nombre
        );
    return new Response(json_encode(array($r)), 201);
});
