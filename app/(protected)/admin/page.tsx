"use client";

import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {

    const onAPIRouteClick = () => {
        console.log("clicked...")
        fetch("/api/admin")
            .then((response) => {
                if(response.ok){
                    toast.success("Allowed api route.")
                }
                else{
                    console.log("Not allowed.");
                }
            });
    }

    return (  
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    Admin
                </p>
                <CardContent className="space-y-4">
                    <RoleGate
                        allowedRole={UserRole.ADMIN}
                    >
                        <FormSuccess 
                            message="You are allowed to see this content." 
                        />
                    </RoleGate>
                    <div className="flex items-center justify-between rounded-lg border p-3 font-medium">
                        <p className="text-sm font-medium">
                            Admin only API route
                        </p>
                        <Button
                            onClick={() => onAPIRouteClick()}
                        >
                            Click to test
                        </Button>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-3 font-medium">
                        <p className="text-sm font-medium">
                            Admin only server action
                        </p>
                        <Button>
                            Click to test
                        </Button>
                    </div>
                </CardContent>
            </CardHeader>
        </Card>
    );
}
 
export default AdminPage;