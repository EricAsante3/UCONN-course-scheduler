using System;
using System.IO;
using System.Text.Json;
using DataObjects;

public class Program
{

    public static void Main()
    {
        // Read the file
        string filePath = "output.json";
        string jsonContent = File.ReadAllText(filePath);

        // Deserialize
        RootPayload data = JsonSerializer.Deserialize<RootPayload>(jsonContent);

        // Output to verify
        data.InitializeScheduler();
        data.value["ECE 2001"].Test();

        
        string json = JsonSerializer.Serialize(data.Scheduler(), new JsonSerializerOptions { WriteIndented = true });
        Console.WriteLine(json);

    }



    

}



