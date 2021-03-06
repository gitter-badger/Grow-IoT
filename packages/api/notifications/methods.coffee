Meteor.methods
  # Add links? For example if a device is offline, clicking on the notification
  # takes you to the offline device.
  'Notifications.new': (notification, userId) ->
    check notification, Match.NonEmptyString

    # There is probably a more elegant way of writing the following.
    if userId
      check userId, Match.NonEmptyString
      document =
        timestamp: new Date()
        notification: notification
        read: false
        owner:
          _id: userId
    else
      document =
        timestamp: new Date()
        notification: notification
        read: false
        owner:
          _id: Meteor.userId()

    throw new Meteor.Error 'internal-error', "Internal error." unless Notifications.documents.insert document

    document

  # Mark a notification as read by id.
  'Notifications.read': (id) ->
    check id, Match.NonEmptyString

    Notifications.documents.update id,
      $set:
      	'read':true
