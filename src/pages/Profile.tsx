
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      toast.success('Profile updated successfully');
      setIsLoading(false);
    }, 1000);
  };

  const handleKYCVerification = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info('KYC verification will be implemented in the next version');
  };

  return (
    <div className="container py-8 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and verification status
          </p>
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList>
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="kyc">KYC Verification</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="fullName" className="text-sm font-medium">
                          Full Name
                        </label>
                        <Input 
                          id="fullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </label>
                        <Input 
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled
                        />
                        <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Phone Number
                        </label>
                        <Input 
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+234 123 4567 890"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kyc" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>KYC Verification</CardTitle>
                <CardDescription>
                  Complete verification to unlock all features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleKYCVerification} className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-md">
                      <h3 className="font-medium mb-2">Verification Status</h3>
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${user?.isVerified ? 'bg-green-500' : 'bg-amber-500'} mr-2`}></div>
                        <span>{user?.isVerified ? 'Verified' : 'Pending Verification'}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="idType" className="text-sm font-medium">
                        ID Document Type
                      </label>
                      <select
                        id="idType"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Select ID Type</option>
                        <option value="nin">National ID (NIN)</option>
                        <option value="passport">International Passport</option>
                        <option value="drivers">Driver's License</option>
                        <option value="voters">Voter's Card</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="idUpload" className="text-sm font-medium">
                        Upload ID Document
                      </label>
                      <div className="border-2 border-dashed rounded-md p-6 text-center border-muted-foreground/25 hover:border-muted-foreground/50 cursor-pointer">
                        <div className="flex flex-col items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-8 h-8 text-muted-foreground mb-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                            />
                          </svg>
                          <span className="text-sm text-muted-foreground">
                            Click to upload or drag and drop
                          </span>
                          <span className="text-xs text-muted-foreground mt-1">
                            PNG, JPG or PDF up to 5MB
                          </span>
                        </div>
                        <input
                          id="idUpload"
                          type="file"
                          className="hidden"
                          accept="image/png,image/jpeg,application/pdf"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="selfieUpload" className="text-sm font-medium">
                        Upload Selfie
                      </label>
                      <div className="border-2 border-dashed rounded-md p-6 text-center border-muted-foreground/25 hover:border-muted-foreground/50 cursor-pointer">
                        <div className="flex flex-col items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-8 h-8 text-muted-foreground mb-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                            />
                          </svg>
                          <span className="text-sm text-muted-foreground">
                            Click to upload a clear selfie
                          </span>
                          <span className="text-xs text-muted-foreground mt-1">
                            PNG or JPG up to 5MB
                          </span>
                        </div>
                        <input
                          id="selfieUpload"
                          type="file"
                          className="hidden"
                          accept="image/png,image/jpeg"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">
                      Submit for Verification
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your password and secure your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="currentPassword" className="text-sm font-medium">
                        Current Password
                      </label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="newPassword" className="text-sm font-medium">
                        New Password
                      </label>
                      <Input id="newPassword" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="confirmNewPassword" className="text-sm font-medium">
                        Confirm New Password
                      </label>
                      <Input id="confirmNewPassword" type="password" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="button" onClick={() => toast.info('Password change will be implemented in next version')}>
                      Change Password
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
