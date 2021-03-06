// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {Notification} from 'electron';

const appIconURL = 'file://assets/appicon_48.png';

const defaultOptions = {
  title: 'Download Complete',
  silent: false,
  icon: appIconURL,
  urgency: 'normal',
};

export class DownloadNotification extends Notification {
  constructor(fileName, serverInfo) {
    const options = {...defaultOptions};
    if (process.platform === 'win32') {
      options.icon = appIconURL;
    } else if (process.platform === 'darwin') { // TODO: review
      // Notification Center shows app's icon, so there were two icons on the notification.
      Reflect.deleteProperty(options, 'icon');
    }

    options.title = process.platform === 'win32' ? serverInfo.name : 'Download Complete';
    options.body = process.platform === 'win32' ? `Download Complete \n ${fileName}` : fileName;

    super(options);
  }
}