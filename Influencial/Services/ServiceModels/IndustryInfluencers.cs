using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Influencial.Services.ServiceModels
{
    public class IndustryInfluencers
    {
        public string Category { get; set; }
        public List<Influencer> Influencers { get; set; }
    }
}