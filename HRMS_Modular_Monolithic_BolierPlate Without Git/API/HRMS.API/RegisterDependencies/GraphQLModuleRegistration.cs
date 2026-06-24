using HotChocolate.Execution.Configuration;
using TodoFeature.GraphQL;
using LeaveFeature.GraphQL;
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
                .AddTypeExtension<LeaveQuery>() // <-- Registers your new Auto-Resolver
                // Registering the Data extensions required for the LeaveQuery attributes
                .AddProjections()
                .AddFiltering()
                .AddSorting();
        }
    }
}