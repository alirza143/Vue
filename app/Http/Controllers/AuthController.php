<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\User;
use Auth;
use Carbon\Carbon;

class AuthController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request){
        $request->validate([
            'name'=>'required|string|max:255',
            'email'=>'required|string|email',
            'password'=>'required|string|confirmed'
        ]);
        $user=new User();
        $user->name=$request->name;
        $user->email = $request->email;
        $user->password=bcrypt($request->password);
        if($user->save()){
            $status = 200;
        } else {
            $status = 500;
        }

        return response()->json($user, $status);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request)
    {
        $request->validate([
            'email'=>'required|string|email',
            'password'=>'required|string',
            'remember_me' => 'boolean'
        ]);

        if (!Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            return response()->json([
                'message'=>'Unauthorized',
                'status_code'=>401
            ]);
        }

        $user=$request->user();

        if($user->role =='administrator'){
            $tokenData = $user->createToken('Personal Access Token', ['do_anything']);
        } else {
            $tokenData = $user->createToken('Personal Access Token', ['can_create']);
        }

        $token = $tokenData->accessToken;

        if($request->remember_me){

            $tokenData->expires_at = Carbon::now()->addWeeks(1);
        }
        // return response()->json(['tokenData'=> $tokenData,'token' => $token],200);
        if($token){
            return response()->json([
                'user'=>$user,
                'access_token'=>$tokenData->accessToken,
                'token_type'=>'Bearer',
                'token_scope'=>$tokenData->token->scopes[0],
                'expires_at'=>Carbon::parse($tokenData->token->expires_at)->toDateTimeString(),
                'status_code' => 200
            ],200);
        }else {
            return response()->json([
                'user'=> 'Some Error',
                'status_code' => 500
            ],200);
        }
    }

    public function logout(Request $request){

        $request->user()->token()->revoke();

        return response()->json([
            'message'=>'Logout successfully!',
            'status_code'=>200
        ],200);
    }
}

