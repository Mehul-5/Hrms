using TodoFeature.Infrastructure;
using LeaveFeature.Infrastructure; // <-- Add this using statement

namespace HRMS.API.RegisterDependencies
{
    public static class RepositoryRegistration
    {
        public static IServiceCollection AddModulesDependencyInjection(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTodoDependency(configuration);
            
            // Forces .NET to load the assembly and inject the DB configuration!
            services.AddLeaveDependency(configuration); 
            
            return services;
        }
    }
}