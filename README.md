###Hipster Code Meetup Specs

#####Developers Spec:
1) Developers can access telnet thru a http link, assumed Genevieve provides this link via emails.

2) Users will be presented with the latest Meetup location and time and RSVP instruction.

3) Once they've RSVP'd, developers will see a confirmation with: 

  <dd>meetup date,</dd>
  <dd>topic,</dd>
  <dd>head count of attendees,</dd>
  <dd>and a message for them to exit telnet</dd>  

4) If this is Genevieve, she has two options:

  <dd>To get rsvp list:</dd>
  type in `adminlist` and press enter</dd>  

  <dd>To add new topic and date:</dd> 
  <dd>type in `adminnew` follow by topic `(Project_Management)` and date `(April_1_2015)` then press enter</dd>

#####Server Spec:
1) Inform developers with latest meetup notice everytime someone signs in to telnet.

2) Inform order of firstname, lastname and email address in order to RSVP.

3) Stores names and email addresses in a JSON file - per meetup date

4) Stores meetup topic and date from Genevieve's input in telnet and display to developers the next time they sign in to telnet.

5) Read and display names and emails of attendees per Genevieve's request, one meetup at a time.