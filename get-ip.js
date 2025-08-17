const os = require('os');

function getLocalIP() {
  const networkInterfaces = os.networkInterfaces();
  
  console.log('🌐 Available network interfaces:');
  console.log('================================');
  
  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    console.log(`\n📡 Interface: ${interfaceName}`);
    
    for (const iface of interfaces) {
      if (iface.family === 'IPv4') {
        const status = iface.internal ? '🔒 Internal' : '🌍 External';
        console.log(`  ${status} ${iface.address}`);
        
        if (!iface.internal) {
          console.log(`  📱 Mobile access: http://${iface.address}:8000`);
        }
      }
    }
  }
  
  console.log('\n💡 To access from mobile:');
  console.log('1. Make sure your mobile device is on the same WiFi network');
  console.log('2. Use the "External" IP address shown above');
  console.log('3. Open your mobile browser and go to: http://[YOUR_IP]:8000');
}

getLocalIP();
