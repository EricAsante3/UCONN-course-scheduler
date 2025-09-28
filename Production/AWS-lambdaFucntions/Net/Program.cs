using System;
using System.IO;
using System.Text.Json;
using DataObjects;
using Amazon.Lambda.Core;

[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]


namespace MySchedulerLambda
{
    public class SchedulerFunction
    {
        public static string SchedulingFunction(SchedulingSystem SchedulingSystem, ILambdaContext context)
        {
            SchedulingSystem.InitializeScheduler();
            string json = JsonSerializer.Serialize(SchedulingSystem.Schedule(), new JsonSerializerOptions { WriteIndented = true });
            return json;
        }
    }
}


