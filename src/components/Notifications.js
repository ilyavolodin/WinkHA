import React from 'react';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

export const Notifications = ({state, clearNotifications}) => {
  if (state && state.length > 0) {
    state.map((notification) => {
      if (notification.type === 'sound') {
        console.log('Loading notification sound');
        const sound = new Sound('door_bell.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('Error loading sound notification', error);
            return;
          } else {
            console.log('Successfully loaded notification sound');
            sound.play((success) => {
              if (!success) {
                console.log('Error playing sound notification');
              } else {
                sound.release();
              }
            });
          }
        });
      }
    });
    clearNotifications();
  }
  return <></>;
};
