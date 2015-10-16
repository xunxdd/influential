using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Influencial.Services;
using NUnit.Framework;

namespace Influential.Tests
{
    [TestFixture]
    public class TwittterServiceTest
    {
        [Test]
        public void GetFollowerTest()
        {

            var t = new Twitterservice().GetFriends("jscoop");

            Console.WriteLine(t.Count());

        }
    }
}
