using HRMS.Core.Postgres.Interfaces;
using LeaveFeature.Infrastructure.Configurations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace LeaveFeature.Infrastructure
{
    public static class ConfigureServiceExtension
    {
        public static IServiceCollection AddLeaveDependency(this IServiceCollection services, IConfiguration configuration)
        {
            // This injects your EF Core configuration into the PostgresDbContext!
            services.AddTransient<IPostgresEntityConfigurator, LeaveBalanceConfiguration>();
            
            return services;
        }
    }
}