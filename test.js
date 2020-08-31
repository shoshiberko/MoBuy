
const debug = require('debug')('mongo:test');
const User = require('./model')("User");
const prompt = require('./prompt');
const timeout = require('./timeout');
//נעשה כ-closure אסינכרוני על מנת שנוכל להשתמש ב-await.
(async () => {
  let user;
//לולאת תפריט.
  while (true) {
//ננקה את המסך.
      console.clear();
      await timeout(500);
//ונדפיס תפריט.
      console.log('Choose action from the menu:');
      console.log('1. Inquire user by username');
      console.log('2. Inquire user by _id and make it dude');
      console.log("3. Inquire users by chained query (admin's created during last month)");
      console.log("4. Do a chain of parallel requests");
      console.log('5. Add a user (different ways)');
      console.log();
      console.log('0. Exit');
      let choice = parseInt(await prompt('> '));
//נפעל ע"פ הבחירה של המשתמש.
      switch (choice) {
//סיום התוכנית.
          case 0:
              process.exit(0);
//נקלוט את שם המשתמש ונעביר לשאילתה לסינון.
          case 1: // get a user by username
              try {
                  console.log(await User.REQUEST(
                                                                     {username: await prompt('Please enter username: ')}));
              }
              catch (err) { console.log(`Failure ${err}`); }
              break;
 
//נקלוט את המזהה של המשתמש (לפי מה שראינו בהדפסת המשתמשים קודם) ונעביר לשאיתה ע"פ המזהה.
          case 2: // get a user by ID
              let user1 = null;
              let id = await prompt('Please enter user _ID: ');
//נבצע שאילתה עם המזהה.
              try {
                  user1 = await User.REQUEST(id);
                  console.log(user1);
              } catch (err) { console.log(`Failure ${err}`); }
//אם קיבלנו (מצאנו) את המשתמש – נוסיף תוספת "'לה" לשמו (דני'לה) [או תוספת "'וש" (שרית'וש)].
              if (user1 !== null) {
                  user1.dudify();
                  console.log(user1);
//נשמור את מסמך המשתמש המעודכן בבסיס הנתונים...
                  try {
                      await user1.save();
                  } catch (err) {
                      console.log(`Failure ${err}`);
                  }
//... ונביא אותו מחדש כדי להדגים את השינוי.
                  try {
                      user1 = await User.REQUEST(id);
                      console.log(user1);
                  } catch (err) {
                      console.log(`Failure ${err}`);
                  }
              }
              break;
//אין מה לקלוט – זו שאילתה מתוכננת מראש.
          case 3:
              // get any admin that was created in the past month
              // get the date 1 month ago
              await prompt("Please press enter to continue to chain request...");
              let monthAgo = new Date();
              monthAgo.setMonth(monthAgo.getMonth() - 1);
              try {
//בניית שאילתה בעזרת פונקציות מודל  בעזרת מסנן והוספת תנאים נוספים.
                  console.log(
                                      await User.find({admin: true}).where('created_at').gt(monthAgo).exec());
              } catch (err) { console.log(`Failure ${err}`); }
              break;
//עכשיו נראה עיבוד מקבילי של פעולות אסינכרוניות. נעשה שלוש בקשות, נפעיל אותן בלי להמתין אחד לסיום השניה. ואז נמתין להשלמת כולן ביחד.
          case 4:
//א)	שאילתה ע"פ שם בעל המשתמש על מנת להוסיף מיקום המשתמש.
              // Update a user
              let queryToUpdateLocation = User.findOne(
                      {name: await prompt("Please enter a name of user to update location: ")}
                  ).exec();
//ב)	שאילתת עדכון סיסמה של משתמש ע"פ שם המשתמש.
              let queryAndUpdatePassword = User.findOneAndUpdate(
                      {username: await prompt("Please enter a username to change password: ")},
                      {password: await prompt("Please enter new password: ")}
                  ).exec();
//ג)	שאילתה ע"פ שם בעל המשתמש על מנת למוחקו.
              let queryForDelete = User.findOne(
                      {name: await prompt("Please enter a name of user to delete: ")}
                  ).exec();
 
//נגדיר משתמים לקליטת ה-Promise של השאילתות הנ"ל.
              let userToUpdateLocation, userPasswordUpdated, userToDelete,
                    updateLocation, removing;
//ונמתין בצורה אסינכרונית לסיום כל השאילתות שהפעלנו.
              try {
                  [userToUpdateLocation, userPasswordUpdated, userToDelete] =
                                          await Promise.all([queryToUpdateLocation,
                                                                            queryAndUpdatePassword,
                                                                            queryForDelete]);
                  console.log("Queries done");
              } catch (err) { console.log(`Failure ${err}`); }
//נדפיס את התוצאות, ובחלק מהשאילתות (א ו-ג) נבצע פעולות נוספות – עדכון ומחיקה כנדרש.
              if (userToUpdateLocation) {
                  console.log(`Updating Location of ${userToUpdateLocation.username}`);
                  // change the users location
                  userToUpdateLocation.location = 'il';
                  // save the user
                  updateLocation = userToUpdateLocation.save();
              }
              else
                  console.log(`Can't update location: user does not exist!`);
              if (userPasswordUpdated)
                  console.log(`Password updated for ${userPasswordUpdated.username}` );
              else
                  console.log(`Can't update password: user does not exist!`);
              if (userToDelete) {
                  console.log(`Deleting user ${userToDelete.username}`);
                  // change the users location
                  removing = user.remove();
              }
              else
                  console.log(`Can't delete: user does not exist!`);
//נמתין בצורה אסינכרונית לביצוע פעולות ההשלמה של שאילתות א ו-ג.
              try {
                  let [res1, res3] = await Promise.all([updateLocation, removing]);
                  console.log("Users location updated and removed successfully");
              } catch (err) { console.log(`Failure ${err}`); }
              break;
//נעשה עוד פעולה – הוספת משתמש בשלוש צורות שונות. קודם כל נקלוט את נתוני המשתמש להוספה.
          case 5:
              let way = await prompt("Choose the way (1 new User.save, 2 User.save 3 Create");
              let input = {
                  name: await prompt("Enter name: "),
                  username: await prompt("Enter username: "),
                  password: await prompt("Enter password")
              };
              let admin = await prompt("Is it admin (Y|y or N|n)? ");
              input.admin = admin == 'Y' || admin == 'y';
              let user, result;
              let dude = () => {};
              if (way !== 3) {
                  let check = await prompt("Do you want to dudify it (Y|y or N|n)? ");
                  if (check == 'Y' || check == 'y')
                      dude = usr => usr.dudify((err, name) => {
                          if (err) throw err;
                          console.log('New name is ' + name);
                      });
              }
              switch (way) {
//יצירת אובייקט המסמך בעזרת יצירת אוביקט מסכימה ונשמור אותו בבסיס הנתונים.
                  case 1:
                      user = new User(input);
                      dude(user);
                      result = user.save();
                      break;
//אפשר לעשות אותו דבר בלי new, הפונקציה של סכימה גם תיצור אוביקט חדש.
                  case 2:
                      user = User(input);
                      dude(user);
                      result = user.save();
                      break;
//ואפשרות שלישית – בדומה למה שעשינו ב- adduser.jsרק ישירות ע"י פונקציה של מודל ולא ע"י פונקציה שהוספנו במודל בעצמנו.
                  case 3:
                      result = User.create(input);
                      break;
              }
//עכשיו נמתין להשלמת פעולה ההוספה.
              try {
                  await result;
                  console.log("User created");
              } catch (err) { debug(`Failed: ${err}`) }
      }
//אחרי ביצוע הפעולה שביקשנו – נחזור לתפריט הראשית לאחר לחיצה נוספת על Enter על מנת לאפשר צפיה בתוצאות לפני שהמסך נמחק.
      await prompt("Press Enter to return to the menu");
  }
})();

 //ויש גם פונקציות למצוא ולמחוק, וגם שאילתה למחיקה של כל המסמכים לפי תנאי – פונקציה סטטית במודל, ועוד פונקציות עזר או פונקציות לפעולות נוספות. תמצאו פירוט כל האפשרויות של mongoose בתיעוד שלו באתר בקישור http://mongoosejs.com/docs/.
