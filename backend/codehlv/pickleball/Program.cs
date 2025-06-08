using Microsoft.EntityFrameworkCore;
using pickleball.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add DbContext with SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Configure Kestrel to listen on all IPs (for local/public access)
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(5192); // HTTP
    serverOptions.ListenAnyIP(7244, listenOptions =>
    {
        listenOptions.UseHttps(); // Use development HTTPS certificate
    });
});

var app = builder.Build();

// Enable Swagger only in Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll"); // Enable CORS before authorization
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
