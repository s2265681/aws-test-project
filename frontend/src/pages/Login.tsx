import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '../contexts/AuthContext';
import ss from './ss.png';
// import { Heart } from 'lucide-react';
// import { health } from '@/services/api';

export const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  // const [healthLoading, setHealthLoading] = useState(false);
  const { login, register } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      setLoading(true);
      await login(email, password);
    } catch {
      // 可以添加 toast 通知
      console.error('登录失败');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      setLoading(true);
      await register(username, email, password);
    } catch {
      console.error('注册失败');
    } finally {
      setLoading(false);
    }
  };

  // const handleHealthCheck = async () => {
  //   try {
  //     setHealthLoading(true);
  //     const response = await health.check();
  //     if (response.data.status === 'healthy') {
  //       console.log('服务器状态正常');
  //     } else {
  //       console.warn('服务器状态异常');
  //     }
  //   } catch {
  //     console.error('服务器连接失败');
  //   } finally {
  //     setHealthLoading(false);
  //   }
  // };

  return (
    <div className="flex w-full h-screen">
      {/* 左侧表单栏 */}
      <div className="flex flex-col justify-center items-center w-full max-w-xl bg-background px-8 md:w-1/2">
        <Card className="w-[320px] max-w-md shadow-none bg-transparent border-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-serif font-bold">
              <div style={{ margin: '20px 0', padding: '16px 0' }}>欢迎回来</div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* <Button 
              variant="outline"
              onClick={handleHealthCheck} 
              disabled={healthLoading}
              className="w-full h-[40px]"
            >
              <Heart className="mr-2 h-4 w-4" />
              {healthLoading ? '检查中...' : '检查服务器状态'}
            </Button> */}

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-2">
                <TabsTrigger value="login">登录</TabsTrigger>
                <TabsTrigger value="register">注册</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="w-full">
                  <div style={{ marginBottom: 16, marginTop: 16 }}>
                    <Label htmlFor="email">邮箱</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="请输入邮箱"
                      className="w-full h-[40px]"
                      required
                      style={{ marginTop: 8 }}
                    />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <Label htmlFor="password">密码</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="请输入密码"
                      className="w-full h-[40px]"
                      required
                      style={{ marginTop: 8 }}
                        autoComplete="off"
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full h-[40px]" style={{ marginTop: 24 }}>
                    {loading ? '登录中...' : '登录'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="w-full">
                  <div style={{ marginBottom: 16 }}>
                    <Label htmlFor="username">用户名</Label>
                    <Input
                      id="username"
                      name="username"
                      placeholder="请输入用户名"
                      className="w-full h-[40px]"
                      required
                        autoComplete="off"
                      style={{ marginTop: 8 }}
                    />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <Label htmlFor="register-email">邮箱</Label>
                    <Input
                      id="register-email"
                      name="email"
                        autoComplete="off"
                      type="email"
                      placeholder="请输入邮箱"
                      className="w-full h-[40px]"
                      required
                      style={{ marginTop: 8 }}
                    />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <Label htmlFor="register-password">密码</Label>
                    <Input
                      id="register-password"
                      name="password"
                      type="password"
                      placeholder="请输入密码"
                      className="w-full h-[40px]"
                      minLength={6}
                      required
                        autoComplete="off"
                      style={{ marginTop: 8 }}
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full h-[40px]" style={{ marginTop: 24 }}>
                    {loading ? '注册中...' : '注册'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      {/* 右侧图片栏 */}
      <div className="w-[594px] flex-none h-screen">
        <img src={ss} alt="插画" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}; 