using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class userHubs: Hub
    {
        public static int TotalViews { get; set; } = 0;

        public async Task NewWindowLoaded()
        {
            TotalViews++;
            // Send update to all client that total views have been updated
            await Clients.All.SendAsync("updateTotalViews", TotalViews);
        }
    }
}
