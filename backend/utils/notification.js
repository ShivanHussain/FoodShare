const sendNotifications = async (donation, ngos) => {
  const notifications = [];
  
  for (const ngo of ngos) {
    // Email notification
    if (ngo.preferences.notifications.email) {
      // Send email logic here
      notifications.push({
        ngoId: ngo._id,
        method: 'email',
        sentAt: new Date()
      });
    }

    // SMS notification
    if (ngo.preferences.notifications.sms) {
      // Send SMS logic here
      notifications.push({
        ngoId: ngo._id,
        method: 'sms',
        sentAt: new Date()
      });
    }
  }

  // Update donation with notification records
  donation.notificationsSent = notifications;
  await donation.save();

  return notifications;
};

export default { sendNotifications };
