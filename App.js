import React, { useEffect, useState } from 'react';
import { View, Button, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

const App = () => {

  const [value, setValue] = useState(0);


  useEffect(() => {
    // Configure PushNotification
    PushNotification.configure({
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
      },
      requestPermissions: Platform.OS === 'ios', // Only for iOS

    });
    let k = new Date();

    setValue(k.getMonth())
    console.log('e33', k.getMonth())
    // Create notification channel
    PushNotification.createChannel(
      {
        channelId: "default-channel-id", // (required)
        channelName: "Default channel", // (required)
        channelDescription: "A default channel", // (optional)
        soundName: "default", // (optional)
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        date: new Date(Date.now() + 5 * 1000), // in 60 secs
        bigPicture: "file:///storage/emulated/0/Internal storage/IMG-20240615-WA0001.jpg",
        largeIconUrl: "file://Internal storage/Android/media/com.whatsapp/WhatsApp/ Media/WhatsApp Images/IMG-20240615-WA0001.jpg", 
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }, []);

  const handleLocalNotification = () => {
    const date = new Date(); // Schedule the notification to be shown in 5 seconds
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours >= 12 ? hours - 12 : hours}:${minutes} ${hours > 12 ? 'pm' : 'am'}`;
    console.log("5", seconds)
    PushNotification.localNotification({

      channelId: "default-channel-id",
      title: ` You Tube ${timeString}`,
      message: `🎉 Time: ${timeString}`,
      picture: "https://www.pexels.com/photo/two-yellow-labrador-retriever-puppies-1108099/",
    });

  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Show Local Notification" onPress={handleLocalNotification} />
    </View>
  );
};

export default App;
