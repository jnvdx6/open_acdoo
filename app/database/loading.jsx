import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DocumentDirectory = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: '#FF6B35' }}>
                <Skeleton className="h-10 w-full max-w-md mx-auto" />
            </h1>

            <Tabs defaultValue="main" className="mb-6">
                {/* <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger
                        value="main"
                        className="data-[state=active]:bg-orange-200 data-[state=active]:text-orange-900"
                    >
                        <Skeleton className="h-8 w-full" />
                    </TabsTrigger>
                    <TabsTrigger
                        value="secondary"
                        className="data-[state=active]:bg-orange-200 data-[state=active]:text-orange-900"
                    >
                        <Skeleton className="h-8 w-full" />
                    </TabsTrigger>
                </TabsList> */}

                <TabsContent value="main">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Card key={index} className="h-full flex flex-col">
                                <CardHeader>
                                    <CardTitle>
                                        <Skeleton className="h-6 w-full max-w-[200px]" />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="secondary">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Card key={index} className="h-full flex flex-col">
                                <CardHeader>
                                    <CardTitle>
                                        <Skeleton className="h-6 w-full max-w-[200px]" />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default DocumentDirectory;