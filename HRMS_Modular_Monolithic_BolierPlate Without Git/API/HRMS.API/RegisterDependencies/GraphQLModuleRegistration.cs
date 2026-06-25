using HotChocolate.Execution.Configuration;
using TodoFeature.GraphQL;
using LeaveFeature.GraphQL;
using HRMS.API.GraphQL; 
using AnnouncementFeature.GraphQL;
using Microsoft.Extensions.DependencyInjection;

namespace HRMS.API.RegisterDependencies
{
    public static class GraphQLModuleRegistration
    {
        public static IRequestExecutorBuilder AddGraphQLModules(this IRequestExecutorBuilder builder)
        {
            return builder
                .AddTodosGraphQL()
                .AddTypeExtension<LeaveMutation>()
                .AddTypeExtension<LeaveQuery>()
                .AddTypeExtension<EmployeeQuery>() 
                .AddTypeExtension<AnnouncementQuery>() 
                .AddProjections()
                .AddFiltering()
                .AddSorting() // <-- Semicolon removed
                // We deleted the .AddMutationType line completely!
                .AddTypeExtension<AnnouncementMutation>(); // <-- Just extend the existing mutation
        }
    }
}