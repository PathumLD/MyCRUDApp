using backend.Database;
using backend.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<ApplicationDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));

//#region CORS setting for API

#region CORS setting for API

builder.Services.AddCors(options =>
{
	options.AddPolicy(name: "_myAllowSpecificOrigins",
					policy =>
					{
						policy.AllowAnyOrigin()
						.AllowAnyHeader()
						.AllowAnyMethod();

						policy.WithOrigins("http://localhost:5173/")
						.AllowAnyHeader()
						.AllowAnyMethod();
					});
});
#endregion


builder.Services.AddAuthentication("JWTAuth")
.AddJwtBearer("JWTAuth", Options => 
{
	var keyBytes = Encoding.UTF8.GetBytes(Constants.Secret);
	var key = new SymmetricSecurityKey(keyBytes);

	Options.TokenValidationParameters = new TokenValidationParameters()
	{
		ValidIssuer = Constants.Issuer,
		ValidAudience = Constants.Audience,
		IssuerSigningKey = key
	};
});

builder.Services.AddControllers();
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


app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthorization();
app.UseCors("_myAllowSpecificOrigins");

app.MapControllers();

app.Run();
