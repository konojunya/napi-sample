#ifndef __CADD_ON_H
#define __CADD_ON_H

#include <napi.h>

class CAddOn : public Napi::ObjectWrap<CAddOn>
{
  private:
    static Napi::FunctionReference constructor;
    Napi::Value _call_fib(const Napi::CallbackInfo& info);

  public:
    CAddOn(const Napi::CallbackInfo& info);
    virtual ~CAddOn() {};

    static Napi::Object init(const Napi::Env env, Napi::Object exports);
};

#endif