#include <iostream>
#include <napi.h>
#include "CAddOn.h"

Napi::FunctionReference CAddOn::constructor;

extern "C" {
  uint64_t fib(uint64_t n) {
    if (n <= 1) {
      return n;
    }
    return fib(n - 1) + fib(n - 2);
  }
};

CAddOn::CAddOn(const Napi::CallbackInfo& info) : Napi::ObjectWrap<CAddOn>(info)
{
  std::cout << "CAddOn::CAddOn" << std::endl;
}

Napi::Object CAddOn::init(const Napi::Env env, Napi::Object exports)
{
  std::cout << "init" << std::endl;

  Napi::Function func = DefineClass(env, "CAddon", {
    InstanceMethod("call_fib", &CAddOn::_call_fib),
  });

  constructor = Napi::Persistent(func);
  constructor.SuppressDestruct();
  exports.Set("CAddOn", func);

  return exports;
}

Napi::Value CAddOn::_call_fib(const Napi::CallbackInfo& info)
{
  std::cout << "_call_fib" << std::endl;

  int32_t _arg = info[0].As<Napi::Number>().Int32Value();
  uint64_t ret = fib(_arg);
  Napi::Number answer = Napi::Number::New(info.Env(), ret);

  return answer;
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  std::cout << "Init" << std::endl;
  return CAddOn::init(env, exports);
}

NODE_API_MODULE(addon, Init)
