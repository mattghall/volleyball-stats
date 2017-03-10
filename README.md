# volleyball-stats - Matt-Stat
Web based command style statting program for volleyball.

When I volunteered as the Team Manager for the SPU NCAA volleyball team, I got super annoyed by the barbaric and inefficient way they ha been taking stats for the last 10-15 years. In order to remedy this annoyance, I went home ater the first night of practice and spent all night throwing this project together.

I used this program to stat every regular season practice and match then emailed the results to the coach.


#Syntax
##Practice Syntax##
Server's-initials + Passer's-initals + pass-rating(0-3) + attempter's-initials + last-touches-initials + action ('k' for kill, 'er' for unforced error, 'eb' for blocked error) + [ENTER/RETURN]
example: Sue Player serves to Jane Dig. Jane's pass has a 2 rating. Sarah Ball attempt. Jane Net attempt. Rebecca Court kill.
Type: SP JD 2 SB JN RC k [ENTER/RETURN]
For a free ball, type "fb" followed by attempts and the eventual kill/error
example: Coach throws free ball on court, Jane Dig attempt. Sarah Ball's kill was blocked for an error via block.
Type: fb JD SB eb [ENTER/RETURN]

##Match Syntax##
Type "match" + [ENTER/RETURN] to switch to match mode (type "practice" to switch back)
If starting on defense:
"p" for passing + passer's-initials + pass-rating(0-3) + attempts/kills/errors as before
example: Jane receives serve and passes (3) to Sarah who gets a kill
Type: p JD 3 SB k [ENTER/RETURN]
"s" for serving + server's initials + serve rating + attempts/kills/errors as before
example: Jane serves an ace
Type: s JD 4
