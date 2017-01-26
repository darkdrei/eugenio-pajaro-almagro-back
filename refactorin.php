public function


<?php
use App\Http\Controllers\Controller;

class UserController extends BaseController {

  /**
   * Confirmacion de servicio
   */
  public function post_comfirm()
  {
      if(Input::has('service_id')){
        $id_servicio = Input::get('service_id');
        $id_driver = Input::get('driver_id');
        $operacion = new Operacion($id_ser, $id_driver);
        if ($operacion->existeServicio()){
            if($operacion->estatusServicio() == '6'){
              return Response::json(array('error'=>'2'))
            }
            if($operacion->estatusServicio() == '6' && $operacion->servicioTieneConductor() ){
              if($operacion->existeConductor()){
                  $operacion->actulizarEstadoServicio(array('estatus_id'=>'2'));
                  $operacion->disponibilidadConductor(array('available'=>'0'));
                  $operacion->actualizarCarroServicio();
                  $user = $operacion->getServicio()->getUSer();
                  if($user->getUuid()==''){
                    return Response::json(array('error'=>'0'));
                  }
                  $push = new Push();
                  $push->enviarMensaje($user->getUuid(),$operacion->getServicio()->getId(),'Tu servicio ha sido confirmado');
                  return Response::json(array('error'=>'0'));
              }
            }else{
              return Response::json(array('error'=>'1'));
            }
        }
      }
      return Response::json(array('error'=>'3'));
}
?>
