using Microsoft.EntityFrameworkCore;
using PICKLEBALL.Services;
using PICKLEBALL.Data;
using Microsoft.Extensions.Logging;
using static PICKLEBALL.Services.UserServices;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Add DB Context
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllersWithViews();
// DI cho Service
builder.Services.AddScoped<UserServices>();
builder.Services.AddScoped<BookingService>();
builder.Services.AddScoped<UserServices.UserService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();


app.MapGet("/", (HttpContext context) =>
{
    context.Response.Redirect("/swagger"); 
    return Task.CompletedTask;
});
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        context.Database.Migrate(); 
      
    }
    catch (Exception ex)
    {
       
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred creating the DB.");
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else 
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.MapControllers();
app.Run();


