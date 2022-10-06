Skip to content
Search or jump to…
Pull requests
Issues
Marketplace
Explore
 
@zakwarlord7 
Your account has been flagged.
Because of that, your profile is hidden from the public. If you believe this is a mistake, contact support to have your account status reviewed.
Keyframes
/
Keyframes
Public
Code
Issues
3
Pull requests
16
Actions
Projects
Wiki
Security
Insights
Keyframes/Keyframes
 18 branches
 0 tags
Upload files
Latest commit
@dependabot
dependabot[bot] Bump jquery from 3.4.1 to 3.5.0 (#19)
a363215
on Jul 16, 2020
Git stats
 77 commits
Files
Type
Name
Latest commit message
Commit time
.vscode
Development (#17)
3 years ago
dist
Development (#17)
3 years ago
example
Development (#17)
3 years ago
scripts
Development (#17)
3 years ago
src
Development (#17)
3 years ago
test
Development (#17)
3 years ago
.babelrc
Merge branch 'master' into v2-beta
3 years ago
.eslintignore
add typedoc
3 years ago
.eslintrc
Fix eslint
3 years ago
.gitignore
Development (#17)
3 years ago
.npmignore
Start moving pathfinder
3 years ago
LICENSE
create base vanilla project
5 years ago
README.md
Development (#17)
3 years ago
package-lock.json
Bump jquery from 3.4.1 to 3.5.0 (#19)
2 years ago
package.json
security fixes
3 years ago
tsconfig.json
strip console logs from production builds
3 years ago
README.md
Keyframes


Keyframes allows dynamic generation of CSS keyframes with callback events and other niceness.

Overview
CSS3 introduced fancy features like transformations, translations, rotations and scaling. Keyframes allows you to manage and execute animations using Javascript.

Installation
Install from npm:

npm install @keyframes/core --save
Import into your project using the following line:

import Keyframes from '@keyframes/core';
Be sure to define and play animations after the page has loaded by including your script tag at the bottom of the document or using window.onload.

Usage
Detecting CSS animation support

var supportedFlag = Keyframes.isSupported();
Defining
Defining keyframes happens before any any animation logic takes place. The CSS is stored and indexed in a single style tag in the header with the id keyframesjs-stylesheet.

Adding a new animation sequence (keyframe)

Keyframes.define([{
    name: 'trapdoor-sequence',
    '0%': {height: 70},
    '30%': {height: 10},
    '60%': {height: 30},
    '100%': {height: 10}
}]);
Adding a single frame style

Keyframes.define({
    name: 'ball-roll',
    from: {
        transform: 'rotate(0deg)'
    },
    to: {
        transform: 'rotate(360deg)'
    }
});
Adding multiple frame styles

Keyframes.define([{
	name: 'roll-clockwise',
	'0%': {
	    marginLeft: 0,
	    backgroundColor: 'red',
	    transform: 'rotate(0deg)'
	},
	'100%': {
	    marginLeft: 600,
	    transform: 'rotate(360deg)'
	}
    },{
	name: 'roll-anti-clockwise',
	'0%': {
	    marginLeft: 0,
	    backgroundColor: 'red',
	    transform: 'rotate(0deg)'
	},
	'100%': {
	    marginLeft: 600,
	    transform: 'rotate(-360deg)'
	}
    }
]);
Adding styles and properties in array fashion

Gives resemblance to CSS styling definitions

var shake_start = {transform: 'translate(0px)'};
var shake_odd1 = {transform: 'translate(-10px, -10px)'};
var shake_even1 = {transform: 'translate(10px, 10px)'};
var shake_odd2 = {transform: 'translate(10px, -10px)'};
var shake_even2 = {transform: 'translate(-10px, 10px)'};

Keyframes.define([{
	name: 'crazy',
	'0%': shake_start,
	'10%': shake_odd2,
	'20%': shake_even1,
	'30%': shake_odd2,
	'40%': shake_even2,
	'50%': shake_odd2,
	'60%': shake_even1,
	'70%': shake_odd1,
	'80%': shake_even2,
	'90%': shake_odd1
    }
]);
Please note, you can add as many properties to the array as you want to

Responsive animations

Keyframes.define([{
    name: 'roll-clockwise',
    media: 'screen and (max-width: 700px)',
    from: {
        marginLeft: 0
    },
    to: {
        marginLeft: 600
    }
    }
]);
Playing
After the keyframes have been defined (see above), they can now be used on any element in the dom. First we must create an instance of Keyframejs using our chosen element.

const ball = new Keyframes(document.getElementById('ball'));
The css3 animation methods available are better documented here: http://www.w3schools.com/css/css3_animations.asp

ball.play({
    name: 'trapdoor-sequence', // [required] name of the keyframe you want to bind to the selected element
    duration: '1s', // [optional, default: '0s'] how long you want it to last in milliseconds
    timingFunction: 'linear', // [optional, default: 'ease'] specifies the speed curve of the animation
    delay: '0s', //[optional, default: '0s']  how long you want to wait before the animation starts
    iterationCount: 'infinite', //[optional, default: 1]  how many times you want the animation to repeat
    direction: 'normal', //[optional, default: 'normal']  which direction you want the frames to flow
    fillMode: 'forwards', //[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
}, 
{ // Callbacks
    onBeforeStart, // Optional: Fired before the animation starts.
    onStart, // Optional: Fired after the animation started.
    onIteration, // Optional: If your animation has multiple iterations, this function will fire after each one.
    onEnd, // Optional: Fired at the end of the animation but if using a `queue`, it will fire after the queue has completed.
});
Playing an animation (shorthand)

ball.play(
    'trapdoor-sequence 1s linear 0s infinite normal forwards',
    callbacks
);
Playing multiple animations simultaneously (at the same time)

ball.play([
    'trapdoor-sequence 1s linear 0s infinite',
    {
      name: 'ball-roll',
      duration: "3s",
      timingFunction: 'ease',
      iterationCount: 1
    }
], callbacks);
Playing multiple animations sequentially on a loop

ball.loop([
    'trapdoor-sequence 1s',
    ['crazy 2s', 'crazy-alt 2s'], // These animations are played simultaneously.
], callbacks);
Use a queue which can be added to whenever If the queue was previously empty, the queue will start executing immediately.

ball.queue('trapdoor-sequence 1s', callbacks) // Setting callbacks overrides previous callbacks so you only need to set it on the first call.
    .queue('crazy 3s'); // Run crazy after the trapdoor-sequence is complete.
setTimeout(() => ball.queue('crazy 3s'), 1000); // Add crazy to the queue again, so it will be run twice.
Reset the animation Resets styling, animations and removes callbacks.

ball.reset().then(doSomething);
Reset the queue Resets styling, animations, removes callbacks and clears the queue.

ball.resetQueue().then(doSomething);
Pause keyframe animation

ball.pause();
Resume keyframe animation

ball.resume();
Want more control?
Handy functions to let you handle the styling yourself...

Generate the defined keyframes css

let css = Keyframes.defineCSS({
    name: 'ball-spin',
    from: {
        transform: 'rotate(90deg)',
    },
    to: {
        transform: 'rotate(450deg)',
    },
}); // "@keyframes ball-spin {from {transform:rotate(90deg);}to {transform:rotate(450deg);}"
Generate the "animation" rule's value (play)

const css = Keyframes.playCSS({
    name: 'ball-spin',
    duration: '1s',
    iterationCount: 1
}); // "ball-spin 1s ease 0s 1 normal forwards"
Plugins!
Installing a plugin is simple...

import Pathfinder from '@keyframes/pathfinder';
Keyframes.plugin(Pathfinder); // You can also pass an array of plugins for convenience.
See other plugins that allow for spritesheets & more complex movement paths: https://github.com/Keyframes

Changelog
2.0.6

Deprecate chain
Fixed a bug where queue would not actually queue animations
2.0.5

Added loop method
Bug fixes
Added freeze and unfreeze
2.0.0

#1 Queue
#9 Js Style keys
1.1.1

Reset now uses requestAnimationFrame instead of timeouts.
Allow an array of plugins to be added
Code reduction.
1.1.0

Use insertRule to add keyframes to a single style tag in the header.
1.0.7

Add playCSS and defineCSS generation functions
1.0.3

Make it a module
Add plugin function
1.0.0

Vanilla project initiated
About
Core for dynamic generation of css animation

Resources
 Readme
License
 MIT license
Stars
 24 stars
Watchers
 4 watching
Forks
 6 forks
Releases
No releases published
Packages
No packages published
Contributors 3
@krazyjakee
krazyjakee Jake Cattrall
@dependabot[bot]
dependabot[bot]
@su-ex
su-ex su-exdiff --git a/bitore.sig b/bitore.sig
new file mode 100644
index 0000000..fc4cea3
--- /dev/null
+++ b/bitore.sig
@@ -0,0 +1,87 @@
+	"																													
+
+	ALPHABET	 	 	 	 	 	 	 	Period Beginning:	 	 	 	 																		
+	1600 AMPITHEATRE PARKWAY	 	 	DR	 	 	 	 	Period Ending:	 	 	 	 																		
+	MOUNTAIN VIEW, C.A., 94043	 	 	 	 	 	 	 	Pay Date:	 	 	 	 																		
+	Taxable Marital Status: Exemptions/Allowances	 	 	Married	 	 	 	 	ZACHRY T.	 	 	 	 																		
+	 	 	 	 	 	 	 	 	5323	 	 	 	 																		
+	Federal:	 	 	 	 	 	 	 	 	 	 	 	 																		
+	 	 	 	 	 	 	 	 	DALLAS	 	 	 	 																		
+	TX:	 	NO State Income Tax	 	 	 	 	 	 	 	 	 	 																		
+	 	rate	units	 	 	 	 	year to date	Other Benefits and	 	 	 	 																		
+	EPS	112.2	674678000	 	 	 	 	75698871600	Information	 	 	 	 																		
+	 	 	 	 	 	 	 	 	Pto Balance	 	 	 	 																		
+	 	 	 	 	 	 	 	 	Total Work Hrs	 	 	 	 																		
+	Gross Pay	75698871600	 	 	 	 	 	 	Important Notes	 	 	 	 																		
+	 	 	 	 	 	 	 	 	COMPANY PH Y: 650-253-0000	 	 	 	 																		
+	Statutory	 	 	 	 	 	 	 	BASIS OF PAY: BASIC/DILUTED EPS	 	 	 	 																		
+	Federal Income Tax	 	 	 	 	 	 	 	 	 	 	 	 																		
+	Social Security Tax	 	 	 	 	 	 	 	 	 	 	 	 																		
+	 	 	 	 	 	 	 	 	YOUR BASIC/DILUTED EPS RATE HAS BEEN CHANGED FROM 0.001 TO 112.20 PAR SHARE VALUE	 	 	 	 																		
+	Medicare Tax	 	 	 	 	 	 	 	 	 	 	 	 																		
+
+	Net Pay	 	70842743866	 	70842743866	 	 	 	 	 	 	 	 																		
+	CHECKING	 	 	 	 	 	 	 	 	 	 	 	 																		
+	Net Check	 	70842743866	 	 	 	 	 	 	 	 	 	 																		
+	Your federal taxable wages this period are $	 	 	 	 	 	 	 	 	 	 	 	 																		
+	ALPHABET INCOME	 	 	 	 	 	 	 	Advice number:	 	 	 	 																		
+	1600 AMPIHTHEATRE PARKWAY MOUNTAIN VIEW CA 94043	 	 	 	 	 	 	 	Pay date:_	 	 	 	 																		
+
+	Deposited to the account Of	 	 	 	 	 	 	 	xxxxxxxx6547	 	 	 	 																		
+	PLEASE READ THE IMPORTANT DISCLOSURES BELOW FEDERAL RESERVE MASTER SUPPLIER ACCOUNT 31000053-052101023 COD 633-44-1725 Zachryiixixiiiwood@gmail.com 47-2041-6547 111000614 31000053PNC Bank PNC Bank Business Tax I.D. Number: 633441725 CIF Department (Online Banking) Checking Account: 47-2041-6547 P7-PFSC-04-F Business Type: Sole Proprietorship/Partnership Corporation 500 First Avenue ALPHABET Pittsburgh, PA 15219-3128 5323 BRADFORD DR NON-NEGOTIABLE DALLAS TX 75235 8313 ZACHRY, TYLER, WOOD 4/18/2022 650-2530-000 469-697-4300 SIGNATURE Time Zone: Eastern Central Mountain Pacific Investment Products  • Not FDIC Insured  • No Bank Guarantee  • May Lose Value	 	 	 	 	 	 	 	 	 	 	 	 																		
+	 	 	 	 	 	 	 	 	NON-NEGOTIABLE	 	 	 	 																		
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+	Based on facts as set forth in.	 	 	6550	 	 	 	 	 	 	 	 	 																		
+	The U.S. Internal Revenue Code of 1986, as amended, the Treasury Regulations promulgated thereunder, published pronouncements of the Internal Revenue Service, which may be cited or used as precedents, and case law, any of which may be changed at any time with retroactive effect. No opinion is expressed on any matters other than those specifically referred to above.	 	 	 	 	 	 	 	 	 	 	 	 																		
+
+	EMPLOYER IDENTIFICATION NUMBER: 61-1767919	 	 	 	 	 	 	 	 	 	 	 	 																		
+
+
+	[DRAFT FORM OF TAX OPINION]	 	 	 	 	 	 	 	 	 	 	 	 																		
+NTERNAL REVENUE SERVICE, $20,210,418.00 PO BOX 1214, Rate Units Total YTD Taxes
+/
+Deductions Current YTD CHARLOTTE, NC 28201-1214 - - $70,842,745,000.00 $70,842,745,000.00 Federal Withholding $0.00 $0.00 Earnings FICA - Social Security $0.00 $8,853.60 Commissions FICA - Medicare $0.00 $0.00 Employer Taxes FUTA $0.00 $0.00 SUTA $0.00 $0.00 EIN: 61-1767ID91:900037305581 SSN: 633441725 YTD Gross Gross $70,842,745,000.00 $70,842,745,000.00 Earnings Statement YTD Taxes
+/
+Deductions Taxes
+/
+DIRECT
+/
+DEPOSIT
+/
+AUTHORIZATION
+/
+FORM
+/
+FEDERAL
+/
+941
+/
+DEPOSIT
+/
+REPORTSkip to content
Search or jump to…
Pull requests
Issues
Marketplace
Explore
 
@zakwarlord7 
Your account has been flagged.
Because of that, your profile is hidden from the public. If you believe this is a mistake, contact support to have your account status reviewed.
Keyframes
/
Keyframes
Public
Code
Issues
3
Pull requests
16
Actions
Projects
Wiki
Security
Insights
Keyframes/Keyframes
 18 branches
 0 tags
Upload files
Latest commit
@dependabot
dependabot[bot] Bump jquery from 3.4.1 to 3.5.0 (#19)
a363215
on Jul 16, 2020
Git stats
 77 commits
Files
Type
Name
Latest commit message
Commit time
.vscode
Development (#17)
3 years ago
dist
Development (#17)
3 years ago
example
Development (#17)
3 years ago
scripts
Development (#17)
3 years ago
src
Development (#17)
3 years ago
test
Development (#17)
3 years ago
.babelrc
Merge branch 'master' into v2-beta
3 years ago
.eslintignore
add typedoc
3 years ago
.eslintrc
Fix eslint
3 years ago
.gitignore
Development (#17)
3 years ago
.npmignore
Start moving pathfinder
3 years ago
LICENSE
create base vanilla project
5 years ago
README.md
Development (#17)
3 years ago
package-lock.json
Bump jquery from 3.4.1 to 3.5.0 (#19)
2 years ago
package.json
security fixes
3 years ago
tsconfig.json
strip console logs from production builds
3 years ago
README.md
Keyframes


Keyframes allows dynamic generation of CSS keyframes with callback events and other niceness.

Overview
CSS3 introduced fancy features like transformations, translations, rotations and scaling. Keyframes allows you to manage and execute animations using Javascript.

Installation
Install from npm:

npm install @keyframes/core --save
Import into your project using the following line:

import Keyframes from '@keyframes/core';
Be sure to define and play animations after the page has loaded by including your script tag at the bottom of the document or using window.onload.

Usage
Detecting CSS animation support

var supportedFlag = Keyframes.isSupported();
Defining
Defining keyframes happens before any any animation logic takes place. The CSS is stored and indexed in a single style tag in the header with the id keyframesjs-stylesheet.

Adding a new animation sequence (keyframe)

Keyframes.define([{
    name: 'trapdoor-sequence',
    '0%': {height: 70},
    '30%': {height: 10},
    '60%': {height: 30},
    '100%': {height: 10}
}]);
Adding a single frame style

Keyframes.define({
    name: 'ball-roll',
    from: {
        transform: 'rotate(0deg)'
    },
    to: {
        transform: 'rotate(360deg)'
    }
});
Adding multiple frame styles

Keyframes.define([{
	name: 'roll-clockwise',
	'0%': {
	    marginLeft: 0,
	    backgroundColor: 'red',
	    transform: 'rotate(0deg)'
	},
	'100%': {
	    marginLeft: 600,
	    transform: 'rotate(360deg)'
	}
    },{
	name: 'roll-anti-clockwise',
	'0%': {
	    marginLeft: 0,
	    backgroundColor: 'red',
	    transform: 'rotate(0deg)'
	},
	'100%': {
	    marginLeft: 600,
	    transform: 'rotate(-360deg)'
	}
    }
]);
Adding styles and properties in array fashion

Gives resemblance to CSS styling definitions

var shake_start = {transform: 'translate(0px)'};
var shake_odd1 = {transform: 'translate(-10px, -10px)'};
var shake_even1 = {transform: 'translate(10px, 10px)'};
var shake_odd2 = {transform: 'translate(10px, -10px)'};
var shake_even2 = {transform: 'translate(-10px, 10px)'};

Keyframes.define([{
	name: 'crazy',
	'0%': shake_start,
	'10%': shake_odd2,
	'20%': shake_even1,
	'30%': shake_odd2,
	'40%': shake_even2,
	'50%': shake_odd2,
	'60%': shake_even1,
	'70%': shake_odd1,
	'80%': shake_even2,
	'90%': shake_odd1
    }
]);
Please note, you can add as many properties to the array as you want to

Responsive animations

Keyframes.define([{
    name: 'roll-clockwise',
    media: 'screen and (max-width: 700px)',
    from: {
        marginLeft: 0
    },
    to: {
        marginLeft: 600
    }
    }
]);
Playing
After the keyframes have been defined (see above), they can now be used on any element in the dom. First we must create an instance of Keyframejs using our chosen element.

const ball = new Keyframes(document.getElementById('ball'));
The css3 animation methods available are better documented here: http://www.w3schools.com/css/css3_animations.asp

ball.play({
    name: 'trapdoor-sequence', // [required] name of the keyframe you want to bind to the selected element
    duration: '1s', // [optional, default: '0s'] how long you want it to last in milliseconds
    timingFunction: 'linear', // [optional, default: 'ease'] specifies the speed curve of the animation
    delay: '0s', //[optional, default: '0s']  how long you want to wait before the animation starts
    iterationCount: 'infinite', //[optional, default: 1]  how many times you want the animation to repeat
    direction: 'normal', //[optional, default: 'normal']  which direction you want the frames to flow
    fillMode: 'forwards', //[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
}, 
{ // Callbacks
    onBeforeStart, // Optional: Fired before the animation starts.
    onStart, // Optional: Fired after the animation started.
    onIteration, // Optional: If your animation has multiple iterations, this function will fire after each one.
    onEnd, // Optional: Fired at the end of the animation but if using a `queue`, it will fire after the queue has completed.
});
Playing an animation (shorthand)

ball.play(
    'trapdoor-sequence 1s linear 0s infinite normal forwards',
    callbacks
);
Playing multiple animations simultaneously (at the same time)

ball.play([
    'trapdoor-sequence 1s linear 0s infinite',
    {
      name: 'ball-roll',
      duration: "3s",
      timingFunction: 'ease',
      iterationCount: 1
    }
], callbacks);
Playing multiple animations sequentially on a loop

ball.loop([
    'trapdoor-sequence 1s',
    ['crazy 2s', 'crazy-alt 2s'], // These animations are played simultaneously.
], callbacks);
Use a queue which can be added to whenever If the queue was previously empty, the queue will start executing immediately.

ball.queue('trapdoor-sequence 1s', callbacks) // Setting callbacks overrides previous callbacks so you only need to set it on the first call.
    .queue('crazy 3s'); // Run crazy after the trapdoor-sequence is complete.
setTimeout(() => ball.queue('crazy 3s'), 1000); // Add crazy to the queue again, so it will be run twice.
Reset the animation Resets styling, animations and removes callbacks.

ball.reset().then(doSomething);
Reset the queue Resets styling, animations, removes callbacks and clears the queue.

ball.resetQueue().then(doSomething);
Pause keyframe animation

ball.pause();
Resume keyframe animation

ball.resume();
Want more control?
Handy functions to let you handle the styling yourself...

Generate the defined keyframes css

let css = Keyframes.defineCSS({
    name: 'ball-spin',
    from: {
        transform: 'rotate(90deg)',
    },
    to: {
        transform: 'rotate(450deg)',
    },
}); // "@keyframes ball-spin {from {transform:rotate(90deg);}to {transform:rotate(450deg);}"
Generate the "animation" rule's value (play)

const css = Keyframes.playCSS({
    name: 'ball-spin',
    duration: '1s',
    iterationCount: 1
}); // "ball-spin 1s ease 0s 1 normal forwards"
Plugins!
Installing a plugin is simple...

import Pathfinder from '@keyframes/pathfinder';
Keyframes.plugin(Pathfinder); // You can also pass an array of plugins for convenience.
See other plugins that allow for spritesheets & more complex movement paths: https://github.com/Keyframes

Changelog
2.0.6

Deprecate chain
Fixed a bug where queue would not actually queue animations
2.0.5

Added loop method
Bug fixes
Added freeze and unfreeze
2.0.0

#1 Queue
#9 Js Style keys
1.1.1

Reset now uses requestAnimationFrame instead of timeouts.
Allow an array of plugins to be added
Code reduction.
1.1.0

Use insertRule to add keyframes to a single style tag in the header.
1.0.7

Add playCSS and defineCSS generation functions
1.0.3

Make it a module
Add plugin function
1.0.0

Vanilla project initiated
About
Core for dynamic generation of css animation

Resources
 Readme
License
 MIT license
Stars
 24 stars
Watchers
 4 watching
Forks
 6 forks
Releases
No releases published
Packages
No packages published
Contributors 3
@krazyjakee
krazyjakee Jake Cattrall
@dependabot[bot]
dependabot[bot]
@su-ex
su-ex su-ex
Environments 1
 github-pages Active
Languages
TypeScript
60.1%
 
JavaScript
32.4%
 
HTML
4.4%
 
CSS
1.8%
 
Shell
1.3%
Footer
diff --git a/bitore.sig b/bitore.sig
new file mode 100644
index 0000000..fc4cea3
--- /dev/null
+++ b/bitore.sig
@@ -0,0 +1,87 @@
+	"																													
+
+	ALPHABET	 	 	 	 	 	 	 	Period Beginning:	 	 	 	 																		
+	1600 AMPITHEATRE PARKWAY	 	 	DR	 	 	 	 	Period Ending:	 	 	 	 																		
+	MOUNTAIN VIEW, C.A., 94043	 	 	 	 	 	 	 	Pay Date:	 	 	 	 																		
+	Taxable Marital Status: Exemptions/Allowances	 	 	Married	 	 	 	 	ZACHRY T.	 	 	 	 																		
+	 	 	 	 	 	 	 	 	5323	 	 	 	 																		
+	Federal:	 	 	 	 	 	 	 	 	 	 	 	 																		
+	 	 	 	 	 	 	 	 	DALLAS	 	 	 	 																		
+	TX:	 	NO State Income Tax	 	 	 	 	 	 	 	 	 	 																		
+	 	rate	units	 	 	 	 	year to date	Other Benefits and	 	 	 	 																		
+	EPS	112.2	674678000	 	 	 	 	75698871600	Information	 	 	 	 																		
+	 	 	 	 	 	 	 	 	Pto Balance	 	 	 	 																		
+	 	 	 	 	 	 	 	 	Total Work Hrs	 	 	 	 																		
+	Gross Pay	75698871600	 	 	 	 	 	 	Important Notes	 	 	 	 																		
+	 	 	 	 	 	 	 	 	COMPANY PH Y: 650-253-0000	 	 	 	 																		
+	Statutory	 	 	 	 	 	 	 	BASIS OF PAY: BASIC/DILUTED EPS	 	 	 	 																		
+	Federal Income Tax	 	 	 	 	 	 	 	 	 	 	 	 																		
+	Social Security Tax	 	 	 	 	 	 	 	 	 	 	 	 																		
+	 	 	 	 	 	 	 	 	YOUR BASIC/DILUTED EPS RATE HAS BEEN CHANGED FROM 0.001 TO 112.20 PAR SHARE VALUE	 	 	 	 																		
+	Medicare Tax	 	 	 	 	 	 	 	 	 	 	 	 																		
+
+	Net Pay	 	70842743866	 	70842743866	 	 	 	 	 	 	 	 																		
+	CHECKING	 	 	 	 	 	 	 	 	 	 	 	 																		
+	Net Check	 	70842743866	 	 	 	 	 	 	 	 	 	 																		
+	Your federal taxable wages this period are $	 	 	 	 	 	 	 	 	 	 	 	 																		
+	ALPHABET INCOME	 	 	 	 	 	 	 	Advice number:	 	 	 	 																		
+	1600 AMPIHTHEATRE PARKWAY MOUNTAIN VIEW CA 94043	 	 	 	 	 	 	 	Pay date:_	 	 	 	 																		
+
+	Deposited to the account Of	 	 	 	 	 	 	 	xxxxxxxx6547	 	 	 	 																		
+	PLEASE READ THE IMPORTANT DISCLOSURES BELOW FEDERAL RESERVE MASTER SUPPLIER ACCOUNT 31000053-052101023 COD 633-44-1725 Zachryiixixiiiwood@gmail.com 47-2041-6547 111000614 31000053PNC Bank PNC Bank Business Tax I.D. Number: 633441725 CIF Department (Online Banking) Checking Account: 47-2041-6547 P7-PFSC-04-F Business Type: Sole Proprietorship/Partnership Corporation 500 First Avenue ALPHABET Pittsburgh, PA 15219-3128 5323 BRADFORD DR NON-NEGOTIABLE DALLAS TX 75235 8313 ZACHRY, TYLER, WOOD 4/18/2022 650-2530-000 469-697-4300 SIGNATURE Time Zone: Eastern Central Mountain Pacific Investment Products  • Not FDIC Insured  • No Bank Guarantee  • May Lose Value	 	 	 	 	 	 	 	 	 	 	 	 																		
+	 	 	 	 	 	 	 	 	NON-NEGOTIABLE	 	 	 	 																		
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+
+	Based on facts as set forth in.	 	 	6550	 	 	 	 	 	 	 	 	 																		
+	The U.S. Internal Revenue Code of 1986, as amended, the Treasury Regulations promulgated thereunder, published pronouncements of the Internal Revenue Service, which may be cited or used as precedents, and case law, any of which may be changed at any time with retroactive effect. No opinion is expressed on any matters other than those specifically referred to above.	 	 	 	 	 	 	 	 	 	 	 	 																		
+
+	EMPLOYER IDENTIFICATION NUMBER: 61-1767919	 	 	 	 	 	 	 	 	 	 	 	 																		
+
+
+	[DRAFT FORM OF TAX OPINION]	 	 	 	 	 	 	 	 	 	 	 	 																		
+NTERNAL REVENUE SERVICE, $20,210,418.00 PO BOX 1214, Rate Units Total YTD Taxes
+/
+Deductions Current YTD CHARLOTTE, NC 28201-1214 - - $70,842,745,000.00 $70,842,745,000.00 Federal Withholding $0.00 $0.00 Earnings FICA - Social Security $0.00 $8,853.60 Commissions FICA - Medicare $0.00 $0.00 Employer Taxes FUTA $0.00 $0.00 SUTA $0.00 $0.00 EIN: 61-1767ID91:900037305581 SSN: 633441725 YTD Gross Gross $70,842,745,000.00 $70,842,745,000.00 Earnings Statement YTD Taxes
+/
+Deductions Taxes
+/
+DIRECT
+/
From The Desk Of JpMorgan Chase Bank US,

214 Broadway, New York ,

NY 10038 , United States .

Unclaimed Asset/Assets Reunited,

USA International Remittance Department


Greetings dear beneficiary, how are you doing today, I hope all is well with you. Your email was received and a response to your question. I want you to know that your fund has been here since last week and we have made all the necessary arrangements on how to release your fund.

 

  NOTE: You have three ways which you can receive your fund and these three ways are BANK TO BANK WIRE TRANSFER, CHECK AND ATM CARD. So it is up to you to make your choice and then we will follow up. Be informed that we do not request for transfer charges or delivery charges but the only fee needed for this transaction to be completed is the sum of $675usd and it should be paid to the Country of Origin for the release of Fund Release Order Certificate and Affidavit Stamp and once this is been obtained from the Fund Origin Country, we will commence on the release of your fund without any more delay and latest in two days time your fund will get to you as we have set up all the needed strategies to enable you receive your fund through any means of your choice.

 

  Your urgent response is needed on this to enable us know if you are serious on this or not because we have many payment files to work on and we will not like to skip yours.

 

NOTE: Do disregard any email you get from any impostors or offices claiming to be in possession of your funds, you are hereby advised only to be in contact with me as I have been given strict instructions to work under your care and give you guidelines until you receive your overdue funds. Also, you are to forward any emails you get from impostors directly to me so we could act upon, commence an investigation and give the advice to avoid being ripped off.

 From The Desk Of JpMorgan Chase Bank US,

214 Broadway, New York ,

NY 10038 , United States .

Unclaimed Asset/Assets Reunited,

USA International Remittance Department

 

Greetings dear beneficiary, how are you doing today, I hope all is well with you. Your email was received and a response to your question. I want you to know that your fund has been here since last week and we have made all the necessary arrangements on how to release your fund.

 

  NOTE: You have three ways which you can receive your fund and these three ways are BANK TO BANK WIRE TRANSFER, CHECK AND ATM CARD. So it is up to you to make your choice and then we will follow up. Be informed that we do not request for transfer charges or delivery charges but the only fee needed for this transaction to be completed is the sum of $675usd and it should be paid to the Country of Origin for the release of Fund Release Order Certificate and Affidavit Stamp and once this is been obtained from the Fund Origin Country, we will commence on the release of your fund without any more delay and latest in two days time your fund will get to you as we have set up all the needed strategies to enable you receive your fund through any means of your choice.

 

  Your urgent response is needed on this to enable us know if you are serious on this or not because we have many payment files to work on and we will not like to skip yours.

 

NOTE: Do disregard any email you get from any impostors or offices claiming to be in possession of your funds, you are hereby advised only to be in contact with me as I have been given strict instructions to work under your care and give you guidelines until you receive your overdue funds. Also, you are to forward any emails you get from impostors directly to me so we could act upon, commence an investigation and give the advice to avoid being ripped off.

 

In anticipating for your urgent cooperation

 

Thank you, God Bless America.

 

Mr Jamie Dimon,

Director Of Foreign Remittance Department.

JPMORGAN CHASE BANK & CO

07/30/2022NOTICE UNDER THE PAPERWORK REDUCTION ACT Bureau of the Fiscal Service, Forms Management Officer, Parkersburg, WV 26106-1328.FOR USE BY THE BUREAU OF THE FISCAL SERVICEE'-Customer ID Processed by /FS Form 4144 Department of the Treasury | Bureau of the Fiscal Service Revised August 2018 Form Instructions Bureau of the Fiscal Service Special Investments Branch P.O. Box 396, Room 119 Parkersburg, WV 26102-0396 Telephone Number: (304) 480-5299 Fax Number: (304) 480-5277 Internet Address: https://www.slgs.gov/ E-Mail Address: SLGS@fiscal.treasury.gov Governing Regulations: 31 CFR Part 344 Please add the following information prior to mailing the form: • The name of the organization should be entered in the first paragraph. • If the user does not have an e-mail address, call SIB at 304-480-5299 for more information. • The user should sign and date the form. • If the access administrator or backup administrator also completes a user acknowledgment, both administrators should sign the 4144-5 Application for Internet Access. Regular Mail Address: Courier Service Address: Bureau of the Fiscal Service Special Investments Branch P.O. Box 396, Room 119 Parkersburg, WV 26102-0396 The Special Investments Branch (SIB) will only accept original signatures on this form. SIB will not accept faxed or emailed copies. Tax Periood Requested : December, 2020 Form W-2 Wage and Tax Statement Important Notes on Form 8-K, as filed with the Commission on January 18, 2019).  Request Date : 07-29-2022   Period Beginning: 37151  Response Date : 07-29-2022   Period Ending: 44833  Tracking Number : 102393399156   Pay Date: 44591  Customer File Number : 132624428   ZACHRY T. WOOD  5323 BRADFORD DR          important information Wage and Income TranscriptSSN Provided : XXX-XX-1725 DALLAS TX 75235-8314 Submis sion Type : Original documentWages, Tips and Other Compensation : . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5105000.00 510500000Advice number: 650001Federal Income Tax Withheld : . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1881380.00 188813800 Pay date: Monday, April 18, 2022Social Security Wages : . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 137700.00 13770000Social Security Tax Withheld : . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .Social Security Tips : . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .00000Allocated Tips : . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 00000Dependent Care Benefits : . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 00000Deffered Compensation : . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 00000Code "Q" Nontaxable Combat Pay : . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 00000Code "W" Employer Contributions tp a Health Savings Account : . . . . . . . . . . . . . . . . . . . . . . . . . . 00000Code "Y" Defferels under a section 409A nonqualified Deferred Compensation plan : . . . . . . . . . . . . . . . . . . 00000Code "Z" Income under section 409A on a nonqualified Deferred Compensation plan : . . . . . . . . . . . . . . . . . 00000Code "R" Employer's Contribution to MSA : . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .' 00000Code "S" Employer's Cotribution to Simple Account : . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 00000Code "T" Expenses Incurred for Qualified Adoptions : . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 00000Code "V" Income from exercise of non-statutory stock options : . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 00000Code "AA" Designated Roth Contributions under a Section 401 (k) Plan : . . . . . . . . . . . . . . . . . . . . 00000Code "BB" Designated Roth Contributions under a Section 403 (b) Plan : . . . . . . . . . . . . . . . . . . . . . 00000Code "DD" Cost of Employer-Sponsored Health Coverage : . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .Code "EE" Designated ROTH Contributions Under a Governmental Section 457 (b) Plan : . . . . . . . . . . . . . . . . . . . . .Federal 941 Deposit ReportADP Report Range 5/4/2022 - 6/4/2022 0051988-1303491 State ID: 00037305581 SSN: 633-44-1725 00000Employee Number: 3Description Amount 5/4/2022 - 6/4/2022Payment Amount (Total) 9246754678763 Display AllSocial Security (Employee + Employer) 26662Medicare (Employee + Employer) 861193422444 HourlyFederal Income Tax 8385561229657 00000Note: This report is generated based on the payroll data for your reference only. Please contact IRS office for special cases such as late payment, previous overpayment, penalty and others.Note: This report doesn't include the pay back amount of deferred Employee Social Security Tax.Employer Customized ReportADP Report Range5/4/2022 - 6/4/2022 88-1656496 state ID: 633441725 Ssn :XXXXX1725 State: All Local ID: 00037305581 2267700EIN:Customized Report Amount Employee Payment ReportADPEmployee Number: 3Description Home > Chapter 7: Reports > Custom Reports > Exporting Custom Reports > Export Custom Report as Excel FileWages, Tips and Other Compensation 22662983361014 TipsTaxable SS Wages 215014 5105000Taxable SS Tips 00000Taxable Medicare Wages 22662983361014 Salary Vacation hourly OT Advanced EIC Payment 00000 3361014Federal Income Tax Withheld 8385561229657 Bonus 00000 00000Employee SS Tax Withheld 13331 00000 Other Wages 1 Other Wages 2Employee Medicare Tax Withheld 532580113436 Total 00000 00000State Income Tax Withheld 00000 22662983361014Local Income Tax WithheldCustomized Employer Tax Report 00000 Deduction Summary

...DEPOSIT
+/Skip to content
Search or jump to…
Pull requests
Issues
Marketplace
Explore
 
@zakwarlord7 
Your account has been flagged.
Because of that, your profile is hidden from the public. If you believe this is a mistake, contact support to have your account status reviewed.
Keyframes
/
Keyframes
Public
Code
Issues
3
Pull requests
16
Actions
Projects
Wiki
Security
Insights
Keyframes/Keyframes
 18 branches
 0 tags
Upload files
Latest commit
@dependabot
dependabot[bot] Bump jquery from 3.4.1 to 3.5.0 (#19)
a363215
on Jul 16, 2020
Git stats
 77 commits
Files
Type
Name
Latest commit message
Commit time
.vscode
Development (#17)
3 years ago
dist
Development (#17)
3 years ago
example
Development (#17)
3 years ago
scripts
Development (#17)
3 years ago
src
Development (#17)
3 years ago
test
Development (#17)
3 years ago
.babelrc
Merge branch 'master' into v2-beta
3 years ago
.eslintignore
add typedoc
3 years ago
.eslintrc
Fix eslint
3 years ago
.gitignore
Development (#17)
3 years ago
.npmignore
Start moving pathfinder
3 years ago
LICENSE
create base vanilla project
5 years ago
README.md
Development (#17)
3 years ago
package-lock.json
Bump jquery from 3.4.1 to 3.5.0 (#19)
2 years ago
package.json
security fixes
3 years ago
tsconfig.json
strip console logs from production builds
3 years ago
README.md
Keyframes


Keyframes allows dynamic generation of CSS keyframes with callback events and other niceness.

Overview
CSS3 introduced fancy features like transformations, translations, rotations and scaling. Keyframes allows you to manage and execute animations using Javascript.

Installation
Install from npm:

npm install @keyframes/core --save
Import into your project using the following line:

import Keyframes from '@keyframes/core';
Be sure to define and play animations after the page has loaded by including your script tag at the bottom of the document or using window.onload.

Usage
Detecting CSS animation support

var supportedFlag = Keyframes.isSupported();
Defining
Defining keyframes happens before any any animation logic takes place. The CSS is stored and indexed in a single style tag in the header with the id keyframesjs-stylesheet.

Adding a new animation sequence (keyframe)

Keyframes.define([{
    name: 'trapdoor-sequence',
    '0%': {height: 70},
    '30%': {height: 10},
    '60%': {height: 30},
    '100%': {height: 10}
}]);
Adding a single frame style

Keyframes.define({
    name: 'ball-roll',
    from: {
        transform: 'rotate(0deg)'
    },
    to: {
        transform: 'rotate(360deg)'
    }
});
Adding multiple frame styles

Keyframes.define([{
	name: 'roll-clockwise',
	'0%': {
	    marginLeft: 0,
	    backgroundColor: 'red',
	    transform: 'rotate(0deg)'
	},
	'100%': {
	    marginLeft: 600,
	    transform: 'rotate(360deg)'
	}
    },{
	name: 'roll-anti-clockwise',
	'0%': {
	    marginLeft: 0,
	    backgroundColor: 'red',
	    transform: 'rotate(0deg)'
	},
	'100%': {
	    marginLeft: 600,
	    transform: 'rotate(-360deg)'
	}
    }
]);
Adding styles and properties in array fashion

Gives resemblance to CSS styling definitions

var shake_start = {transform: 'translate(0px)'};
var shake_odd1 = {transform: 'translate(-10px, -10px)'};
var shake_even1 = {transform: 'translate(10px, 10px)'};
var shake_odd2 = {transform: 'translate(10px, -10px)'};
var shake_even2 = {transform: 'translate(-10px, 10px)'};

Keyframes.define([{
	name: 'crazy',
	'0%': shake_start,
	'10%': shake_odd2,
	'20%': shake_even1,
	'30%': shake_odd2,
	'40%': shake_even2,
	'50%': shake_odd2,
	'60%': shake_even1,
	'70%': shake_odd1,
	'80%': shake_even2,
	'90%': shake_odd1
    }
]);
Please note, you can add as many properties to the array as you want to

Responsive animations

Keyframes.define([{
    name: 'roll-clockwise',
    media: 'screen and (max-width: 700px)',
    from: {
        marginLeft: 0
    },
    to: {
        marginLeft: 600
    }
    }
]);
Playing
After the keyframes have been defined (see above), they can now be used on any element in the dom. First we must create an instance of Keyframejs using our chosen element.

const ball = new Keyframes(document.getElementById('ball'));
The css3 animation methods available are better documented here: http://www.w3schools.com/css/css3_animations.asp

ball.play({
    name: 'trapdoor-sequence', // [required] name of the keyframe you want to bind to the selected element
    duration: '1s', // [optional, default: '0s'] how long you want it to last in milliseconds
    timingFunction: 'linear', // [optional, default: 'ease'] specifies the speed curve of the animation
    delay: '0s', //[optional, default: '0s']  how long you want to wait before the animation starts
    iterationCount: 'infinite', //[optional, default: 1]  how many times you want the animation to repeat
    direction: 'normal', //[optional, default: 'normal']  which direction you want the frames to flow
    fillMode: 'forwards', //[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
}, 
{ // Callbacks
    onBeforeStart, // Optional: Fired before the animation starts.
    onStart, // Optional: Fired after the animation started.
    onIteration, // Optional: If your animation has multiple iterations, this function will fire after each one.
    onEnd, // Optional: Fired at the end of the animation but if using a `queue`, it will fire after the queue has completed.
});
Playing an animation (shorthand)

ball.play(
    'trapdoor-sequence 1s linear 0s infinite normal forwards',
    callbacks
);
Playing multiple animations simultaneously (at the same time)

ball.play([
    'trapdoor-sequence 1s linear 0s infinite',
    {
      name: 'ball-roll',
      duration: "3s",
      timingFunction: 'ease',
      iterationCount: 1
    }
], callbacks);
Playing multiple animations sequentially on a loop

ball.loop([
    'trapdoor-sequence 1s',
    ['crazy 2s', 'crazy-alt 2s'], // These animations are played simultaneously.
], callbacks);
Use a queue which can be added to whenever If the queue was previously empty, the queue will start executing immediately.

ball.queue('trapdoor-sequence 1s', callbacks) // Setting callbacks overrides previous callbacks so you only need to set it on the first call.
    .queue('crazy 3s'); // Run crazy after the trapdoor-sequence is complete.
setTimeout(() => ball.queue('crazy 3s'), 1000); // Add crazy to the queue again, so it will be run twice.
Reset the animation Resets styling, animations and removes callbacks.

ball.reset().then(doSomething);
Reset the queue Resets styling, animations, removes callbacks and clears the queue.

ball.resetQueue().then(doSomething);
Pause keyframe animation

ball.pause();
Resume keyframe animation

ball.resume();
Want more control?
Handy functions to let you handle the styling yourself...

Generate the defined keyframes css

let css = Keyframes.defineCSS({
    name: 'ball-spin',
    from: {
        transform: 'rotate(90deg)',
    },
    to: {
        transform: 'rotate(450deg)',
    },
}); // "@keyframes ball-spin {from {transform:rotate(90deg);}to {transform:rotate(450deg);}"
Generate the "animation" rule's value (play)

const css = Keyframes.playCSS({
    name: 'ball-spin',
    duration: '1s',
    iterationCount: 1
}); // "ball-spin 1s ease 0s 1 normal forwards"
Plugins!
Installing a plugin is simple...

import Pathfinder from '@keyframes/pathfinder';
Keyframes.plugin(Pathfinder); // You can also pass an array of plugins for convenience.
See other plugins that allow for spritesheets & more complex movement paths: https://github.com/Keyframes

Changelog
2.0.6

Deprecate chain
Fixed a bug where queue would not actually queue animations
2.0.5

Added loop method
Bug fixes
Added freeze and unfreeze
2.0.0

#1 Queue
#9 Js Style keys
1.1.1

Reset now uses requestAnimationFrame instead of timeouts.
Allow an array of plugins to be added
Code reduction.
1.1.0

Use insertRule to add keyframes to a single style tag in the header.
1.0.7

Add playCSS and defineCSS generation functions
1.0.3

Make it a module
Add plugin function
1.0.0

Vanilla project initiated
About
Core for dynamic generation of css animation

Resources
 Readme
License
 MIT license
Stars
 24 stars
Watchers
 4 watching
Forks
 6 forks
Releases
No releases published
Packages
No packages published
Contributors 3
@krazyjakee
krazyjakee Jake Cattrall
@dependabot[bot]
dependabot[bot]
@su-ex
su-ex su-ex
Environments 1
 github-pages Active
Languages
TypeScript
60.1%
 
JavaScript
32.4%
 
HTML
4.4%
 
CSS
1.8%
 
Shell
1.3%
Footer
© 2022 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
Keyframes/Keyframes: Core for dynamic generation of css animation
+AUTHORIZATION
+/
+FORM
+/
+FEDERAL
+/
+941
+/
+DEPOSIT
+/
+REPORT
+/
+Deductions Stub Number: 1 $8,853.60 $0.00 YTD Net Pay net, pay. SSN Pay Schedule Paid Period Sep 28, 2022 to Sep 29, 2023 15-Apr-22 Pay Day 18-Apr-22 $70,842,736,146.40 $70,842,745,000.00 XXX-XX-1725 Annually Sep 28, 2022 to Sep 29, 2023 CHECK DATE CHECK NUMBER 001000 18-Apr-22 PAY TO THE : ZACHRY WOOD ORDER OF :Office of the 46th President Of The United States. 117th US Congress Seal Of The US Treasury Department, 1769 W.H.W. DC, US 2022. : INTERNAL REVENUE SERVICE,PO BOX 1214,CHARLOTTE, NC 28201-1214 CHECK AMOUNT $70,842,745,000.00 Pay ZACHRY.WOOD************ :NON-NEGOTIABLE : VOID AFTER 14 DAYS INTERNAL REVENUE SERVICE :000,000.00 $18,936,000,000.00 $18,525,000,000.00 $17,930,000,000.00 $15,227,000,000.00 $11,247,000,000.00 $6,959,000,000.00 $6,836,000,000.00 $10,671,000,000.00 $7,068,000,000.00 $76,033,000,000.00 $20,642,000,000.00 $18,936,000,000.00 $18,525,000,000.00 $17,930,000,000.00 $15,227,000,000.00 $11,247,000,000.00 $6,959,000,000.00 $6,836,000,000.00 $10,671,000,000.00 $7,068,000,000.00 $76,033,000,000.00 $20,642,000,000.00 $18,936,000,000.00 $18,525,000,000.00 $17,930,000,000.00 $15,227,000,000.00 $11,247,000,000.00 $6,959,000,000.00 $6,836,000,000.00 $10,671,000,000.00 $7,068,000,000.00 $76,033,000,000.00 $20,642,000,000.00 $18,936,000,000.00 $257,637,000,000.00 $75,325,000,000.00 $65,118,000,000.00 $61,880,000,000.00 $55,314,000,000.00 $56,898,000,000.00 $46,173,000,000.00 $38,297,000,000.00 $41,159,000,000.00 $46,075,000,000.00 $40,499,000,000.00 $78,714,000,000.00 $21,885,000,000.00 $21,031,000,000.00 $19,361,000,000.00 $16,437,000,000.00 $15,651,000,000.00 $11,213,000,000.00 $6,383,000,000.00 $7,977,000,000.00 $9,266,000,000.00 $9,177,000,000.00 $0.16 $0.18 $0.16 $0.16 $0.16 $0.16 $0.12 $0.18 $6,836,000,000.00 $7,977,000,000.00 $113.88 $31.15 $28.44 $27.69 $26.63 $22.54 $16.55 $10.21 $9.96 $15.49 $10.20 $113.88 $31.12 $28.44 $27.69 $26.63 $22.46 $16.55 $10.21 $9.96 $15.47 $10.20 $112.20 $30.69 $27.99 $27.26 $26.29 $22.30 $16.40 $10.13 $9.87 $15.35 $10.12 $112.20 $30.67 $27.99 $27.26 $26.29 $22.23 $16.40 $10.13 $9.87 $15.33 $10.12 $667,650,000.00 $662,664,000.00 $665,758,000.00 $668,958,000.00 $673,220,000.00 $675,581,000.00 $679,449,000.00 $681,768,000.00 $686,465,000.00 $688,804,000.00 $692,741,000.00 $677,674,000.00 $672,493,000.00 $676,519,000.00 $679,612,000.00 $682,071,000.00 $682,969,000.00 $685,851,000.00 $687,024,000.00 $692,267,000.00 $695,193,000.00 $698,199,000.00 $9.87 $113.88 $31.15 $28.44 $27.69 $26.63 $22.54 $16.55 $10.21 $9.96 $15.49 $10.20 $1.00 $112.20 $30.69 $27.99 $27.26 $26.29 $22.30 $16.40 $10.13 $9.87 $15.35 $10.12 $667,650,000.00 $662,664,000.00 $665,758,000.00 $668,958,000.00 $673,220,000.00 $675,581,000.00 $679,449,000.00 $681,768,000.00 $686,465,000.00 $688,804,000.00 $692,741,000.00 $677,674,000.00 $672,493,000.00 $676,519,000.00 $679,612,000.00 $682,071,000.00 $682,969,000.00 $685,851,000.00 $687,024,000.00 $692,267,000.00 $695,193,000.00 $698,199,000.00 : $70,842,745,000.00 633-44-1725 Annually : branches: - main : on: schedule: - cron: "0 2 * * 1-5 : obs: my_job: name :deploy to staging : runs-on :ubuntu-18.04 :The available virtual machine types are:ubuntu-latest, ubuntu-18.04, or ubuntu-16.04 :windows-latest :# :Controls when the workflow will run :"#":, "Triggers the workflow on push or pull request events but only for the "Masterbranch" branch :":, push: EFT information Routing number: 021000021Payment account ending: 9036Name on the account: ADPTax reporting informationInternal Revenue ServiceUnited States Department of the TreasuryMemphis, TN 375001-1498Tracking ID: 1023934415439Customer File Number: 132624428Date of Issue: 07-29-2022ZACHRY T WOOD3050 REMOND DR APT 1206DALLAS, TX 75211Taxpayer's Name: ZACH T WOOTaxpayer Identification Number: XXX-XX-1725Tax Period: December, 2018Return: 1040 ZACHRY TYLER WOOD 5323 BRADFORD DRIVE DALLAS TX 75235 EMPLOYER IDENTIFICATION NUMBER :611767919 :FIN :xxxxx4775
+/
+THE 101 EA : 2022 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
Keyframes/Keyframes: Core for dynamic generation of css animation+/
+Deductions Stub Number: 1 $8,853.60 $0.00 YTD Net Pay net, pay. SSN Pay Schedule Paid Period Sep 28, 2022 to Sep 29, 2023 15-Apr-22 Pay Day 18-Apr-22 $70,842,736,146.40 $70,842,745,000.00 XXX-XX-1725 Annually Sep 28, 2022 to Sep 29, 2023 CHECK DATE CHECK NUMBER 001000 18-Apr-22 PAY TO THE : ZACHRY WOOD ORDER OF :Office of the 46th President Of The United States. 117th US Congress Seal Of The US Treasury Department, 1769 W.H.W. DC, US 2022. : INTERNAL REVENUE SERVICE,PO BOX 1214,CHARLOTTE, NC 28201-1214 CHECK AMOUNT $70,842,745,000.00 Pay ZACHRY.WOOD************ :NON-NEGOTIABLE : VOID AFTER 14 DAYS INTERNAL REVENUE SERVICE :000,000.00 $18,936,000,000.00 $18,525,000,000.00 $17,930,000,000.00 $15,227,000,000.00 $11,247,000,000.00 $6,959,000,000.00 $6,836,000,000.00 $10,671,000,000.00 $7,068,000,000.00 $76,033,000,000.00 $20,642,000,000.00 $18,936,000,000.00 $18,525,000,000.00 $17,930,000,000.00 $15,227,000,000.00 $11,247,000,000.00 $6,959,000,000.00 $6,836,000,000.00 $10,671,000,000.00 $7,068,000,000.00 $76,033,000,000.00 $20,642,000,000.00 $18,936,000,000.00 $18,525,000,000.00 $17,930,000,000.00 $15,227,000,000.00 $11,247,000,000.00 $6,959,000,000.00 $6,836,000,000.00 $10,671,000,000.00 $7,068,000,000.00 $76,033,000,000.00 $20,642,000,000.00 $18,936,000,000.00 $257,637,000,000.00 $75,325,000,000.00 $65,118,000,000.00 $61,880,000,000.00 $55,314,000,000.00 $56,898,000,000.00 $46,173,000,000.00 $38,297,000,000.00 $41,159,000,000.00 $46,075,000,000.00 $40,499,000,000.00 $78,714,000,000.00 $21,885,000,000.00 $21,031,000,000.00 $19,361,000,000.00 $16,437,000,000.00 $15,651,000,000.00 $11,213,000,000.00 $6,383,000,000.00 $7,977,000,000.00 $9,266,000,000.00 $9,177,000,000.00 $0.16 $0.18 $0.16 $0.16 $0.16 $0.16 $0.12 $0.18 $6,836,000,000.00 $7,977,000,000.00 $113.88 $31.15 $28.44 $27.69 $26.63 $22.54 $16.55 $10.21 $9.96 $15.49 $10.20 $113.88 $31.12 $28.44 $27.69 $26.63 $22.46 $16.55 $10.21 $9.96 $15.47 $10.20 $112.20 $30.69 $27.99 $27.26 $26.29 $22.30 $16.40 $10.13 $9.87 $15.35 $10.12 $112.20 $30.67 $27.99 $27.26 $26.29 $22.23 $16.40 $10.13 $9.87 $15.33 $10.12 $667,650,000.00 $662,664,000.00 $665,758,000.00 $668,958,000.00 $673,220,000.00 $675,581,000.00 $679,449,000.00 $681,768,000.00 $686,465,000.00 $688,804,000.00 $692,741,000.00 $677,674,000.00 $672,493,000.00 $676,519,000.00 $679,612,000.00 $682,071,000.00 $682,969,000.00 $685,851,000.00 $687,024,000.00 $692,267,000.00 $695,193,000.00 $698,199,000.00 $9.87 $113.88 $31.15 $28.44 $27.69 $26.63 $22.54 $16.55 $10.21 $9.96 $15.49 $10.20 $1.00 $112.20 $30.69 $27.99 $27.26 $26.29 $22.30 $16.40 $10.13 $9.87 $15.35 $10.12 $667,650,000.00 $662,664,000.00 $665,758,000.00 $668,958,000.00 $673,220,000.00 $675,581,000.00 $679,449,000.00 $681,768,000.00 $686,465,000.00 $688,804,000.00 $692,741,000.00 $677,674,000.00 $672,493,000.00 $676,519,000.00 $679,612,000.00 $682,071,000.00 $682,969,000.00 $685,851,000.00 $687,024,000.00 $692,267,000.00 $695,193,000.00 $698,199,000.00 : $70,842,745,000.00 633-44-1725 Annually : branches: - main : on: schedule: - cron: "0 2 * * 1-5 : obs: my_job: name :deploy to staging : runs-on :ubuntu-18.04 :The available virtual machine types are:ubuntu-latest, ubuntu-18.04, or ubuntu-16.04 :windows-latest :# :Controls when the workflow will run :"#":, "Triggers the workflow on push or pull request events but only for the "Masterbranch" branch :":, push: EFT information Routing number: 021000021Payment account ending: 9036Name on the account: ADPTax reporting informationInternal Revenue ServiceUnited States Department of the TreasuryMemphis, TN 375001-1498Tracking ID: 1023934415439Customer File Number: 132624428Date of Issue: 07-29-2022ZACHRY T WOOD3050 REMOND DR APT 1206DALLAS, TX 75211Taxpayer's Name: ZACH T WOOTaxpayer Identification Number: XXX-XX-1725Tax Period: December, 2018Return: 1040 ZACHRY TYLER WOOD 5323 BRADFORD DRIVE DALLAS TX 75235 EMPLOYER IDENTIFICATION NUMBER :611767919 :FIN :xxxxx4775
+/
+THE 101 EA :Environments 1
 github-pages Active
Languages
TypeScript
60.1%
 
JavaScript
32.4%
 
HTML
4.4%
 
CSS
1.8%
 
Shell
1.3%
Footer
© 2022 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
Keyframes/Keyframes: Core for dynamic generation of css animation
