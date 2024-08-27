using DinePulse_API.Hubs;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();

// Add CORS policy
var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
        builder.WithOrigins(allowedOrigins)
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials();
    });
});

var app = builder.Build();

// Enable Swagger for all environments
app.UseSwagger();
app.UseSwaggerUI();
IConfiguration configuration = app.Configuration;

app.UseHttpsRedirection();

// Use the specified CORS policy
app.UseCors("AllowSpecificOrigin");

app.UseAuthorization();
app.UseRouting();
app.UseStaticFiles();

app.MapControllers();
app.MapHub<AdminNotificationHub>("/AdminNotificationHub");


app.Run();
