using OpenMapRepo.Interfaces;
using OpenMapRepo.Repository;
using OpenMapRepo.Services;

var builder = WebApplication.CreateBuilder(args);


#region [Cors]
builder.Services.AddCors();
#endregion

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddScoped<IOpenMapService, OpenMapService>();
builder.Services.AddScoped<IOpenMapRepository, OpenMapRepository>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
#region [Cors]
app.UseCors(c =>
{
    c.AllowAnyHeader();
    c.AllowAnyMethod();
    c.AllowAnyOrigin();
});
#endregion

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
