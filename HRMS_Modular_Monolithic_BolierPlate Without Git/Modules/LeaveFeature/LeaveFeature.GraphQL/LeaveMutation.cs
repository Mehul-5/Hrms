using System;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using LeaveFeature.Application.Handlers;
using MediatR;

namespace LeaveFeature.GraphQL
{
    [ExtendObjectType("Mutation")]
    public class LeaveMutation
    {
        public async Task<bool> SubmitLeaveRequest(
            Guid employeeId, 
            string leaveType, 
            decimal daysRequested, 
            [Service] IMediator mediator)
        {
            // This sends the command to your SubmitLeaveCommandHandler
            return await mediator.Send(new SubmitLeaveCommand(employeeId, leaveType, daysRequested));
        }
    }
}