using System.Text.Json;
using DataObjects;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");
app.Urls.Add("http://0.0.0.0:5041");

app.MapGet("/", () => "Scheduler API running!");


app.MapPost("/schedule", (SchedulingSystem schedulingSystem) =>
{
    if (schedulingSystem == null)
        return Results.BadRequest(new { error = "Invalid or missing scheduling system data" });

    schedulingSystem.InitializeScheduler();
    var schedule = schedulingSystem.Schedule();

    return Results.Json(schedule, new JsonSerializerOptions { WriteIndented = true });
});

app.Run();
