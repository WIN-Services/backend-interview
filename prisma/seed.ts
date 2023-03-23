import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

async function seed() {

    const testingService = await client.services.create({
        data: { name: "Testing", description: "Testing Description", fee: 100 }
    });
    const analysisService = await client.services.create({
        data: { name: "Analysis", description: "Analysis Description", fee: 100 }
    });
    const inspectionService = await client.services.create({
        data: { name: "Inspection", description: "Inspection Description", fee: 100 }
    });

    await client.users.create({
        data:
            {
                "email": "a@abc.com",
                "name": "a",
                orders:{
                    create:[
                        {
                            totalFee: 200,
                            services: {
                                connect: [
                                    {id:testingService.id},
                                    {id:inspectionService.id}
                                ]
                            }
                        },
                        {
                            totalFee: 100,
                            services: {
                                connect:
                                    {id:analysisService.id}
                            }
                        }
                    ]
                }
            }
    })

    await client.users.create({
        data:
            {
                "email": "b@abc.com",
                "name": "b",
                orders:{
                    create:[
                        {
                            totalFee: 200,
                            services: {
                                connect: [
                                    {id:testingService.id},
                                    {id:inspectionService.id}
                                ]
                            }
                        },
                        {
                            totalFee: 100,
                            services: {
                                connect:
                                    {id:analysisService.id}
                            }
                        }
                    ]
                }
            }
    })

    await client.users.create({
        data:
            {
                "email": "c@abc.com",
                "name": "c",
                orders:{
                    create:[
                        {
                            totalFee: 200,
                            services: {
                                connect: [
                                    {id:testingService.id},
                                    {id:inspectionService.id}
                                ]
                            }
                        },
                        {
                            totalFee: 100,
                            services: {
                                connect:
                                    {id:analysisService.id}
                            }
                        }
                    ]
                }
            }
    })
}

seed().catch(e=>{
    console.log(`An error occured: ${e}`);
    process.exit(1);
}).finally(async () => {
    await client.$disconnect()
})