using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class userHubs: Hub
    {
        public static int TotalViews { get; set; } = 0;
        public static int TotalUsers { get; set; } = 0;

        public override Task OnConnectedAsync()
        {
            TotalUsers++;
            Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult(); 
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? expecption)
        {
            TotalUsers--;
            Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult(); 
            return base.OnDisconnectedAsync(expecption);
        }

        public async Task<string> NewWindowLoaded(string name)
        {
            TotalViews++;
            // Send update to all client that total views have been updated
            await Clients.All.SendAsync("updateTotalViews", TotalViews);
            return $"Total Views: {TotalViews} from {name}";
        }
    }
}
