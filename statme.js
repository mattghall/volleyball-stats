var viewmodel;
var inPractice = true;
var theTeam =["AL","AG","CH","GO","HL","JH","KM","LB","MH","MD","ML","NT","SC","SK","ST"];
var numTeam =["8","4","2","3","6","9","25","10","1","18","11","14","12","5","7"];

function vbTeam(a)
{
  var result = theTeam.indexOf(a.toUpperCase());
  if(result == -1)
    result = numTeam.indexOf(a);
  return result;
}

// Class to represent a row in the seat reservations grid
function Player(number, initials, last, first, kills, errors, errorBlocks, attempts,p3,p2,p1,p0,s4,s3,s2,s1,s0) {
    var self = this;
    self.number = number;
    self.initials = initials;
    self.last = last;
    self.first = first;
    self.kills = ko.observable(kills);
    self.errors = ko.observable(errors);
    self.errorBlocks = ko.observable(errorBlocks);
    self.attempts = ko.observable(attempts);
    self.p3 = ko.observable(p3);
    self.p2 = ko.observable(p2);
    self.p1 = ko.observable(p1);
    self.p0 = ko.observable(p0);
    self.s4 = ko.observable(s4);
    self.s3 = ko.observable(s3);
    self.s2 = ko.observable(s2);
    self.s1 = ko.observable(s1);
    self.s0 = ko.observable(s0);
    var t = kills + errors + attempts;
    var p;
    var ep;
    var uep;
    if(t != 0)    {
      p = ((kills-errors)/(t));
      p = p.toFixed(3);
      ep = ((errors)/(t));
      ep = ep.toFixed(3);
      uep = ((errors - errorBlocks)/(t));
      uep = uep.toFixed(3);
    }
    var ap = 0;
    var as = 0;
    var tp = p3 + p2 + p1 + p0;
    if(tp != 0)
      ap = (p3 * 3 + p2 * 2 + p1 - p0) / tp;
    var ts = s4 + s3 + s2 + s1 + s0;
    if(ts != 0)
      as = (s4 * 4 + s3 * 3 + s2 * 2 + s1 - s0) / ts;
    self.totalAttempts = ko.observable(t);
    self.percentage = ko.observable(p);
    self.errPercent = ko.observable(ep);
    self.unfErrPercent = ko.observable(uep);
    self.totalPass = ko.observable(tp);
    self.avgPass =  ko.observable(ap.toFixed(3));
    self.totalServe = ko.observable(ts);
    self.avgServe =  ko.observable(as.toFixed(3));
    self.fullName = first + " " + last;
}

// Overall viewmodel for this screen, along with initial state
function PlayersViewModel() {
    var self = this;

	self.teamStats = ko.observable(
		new Player( "0", "SPU", "Stats", "Team", 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0, 0)
	);

    // Editable data
    self.players = ko.observableArray([
      new Player( "8", "AL", "Lautenbauch", "Abbey", 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0, 0),
      new Player( "4", "AG", "Ganete", "Amanda", 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0, 0),
      new Player( "2", "CH", "Hannigan", "Colleen", 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0, 0),
      new Player( "3", "GO", "Oddo", "Gabby", 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0, 0),
      new Player( "6", "HL", "Lautenbach", "Hannah", 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 , 0, 0),
      new Player( "9", "JH", "Hooker", "Jaeden", 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 , 0),
      new Player( "25", "KM", "Mansfield", "Katie", 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0,0),
      new Player( "10", "LB", "Biondi", "Lexi", 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0,0),
      new Player( "1", "MH", "Hommes", "Maddi", 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0,0),
      new Player( "18", "MD", "Donohee", "Mallie", 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0,0),
      new Player( "11", "ML", "Langdon", "Molly", 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0,0),
      new Player( "14", "NT", "Tchabanov", "Nicole", 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0,0),
      new Player( "12", "SC", "Crespi", "Shaun", 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0,0),
      new Player( "5", "SK", "Kuehl", "Sophie", 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0,0),
      new Player( "7", "ST", "Tran", "Symone", 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0,0)
    ]);
    self.addKill = function(e) {
      var i = e.initials;
      var k = GetPlayerVal(i,"kills") + 1;
      var t = GetPlayerVal(i,"totalAttempts") + 1;
      UpdatePlayer(i, "kills", k);
	    UpdateTeam("kills",1);
      UpdateHittingStats(i, t);
    }
    self.unKill = function(e) {
      var i = e.initials;
      var k = GetPlayerVal(i,"kills") - 1;
      if(k<0)return;
      var t = GetPlayerVal(i,"totalAttempts") - 1;
      UpdatePlayer(i, "kills", k);
	    UpdateTeam("kills",-1);
      UpdateHittingStats(i, t);
    }
    self.addError = function(e) {
      var i = e.initials;
      var er = GetPlayerVal(i,"errors") + 1;
      var t = GetPlayerVal(i,"totalAttempts") + 1;
      UpdatePlayer(i, "errors", er);
	    UpdateTeam("errors",1);
      UpdateHittingStats(i, t);
    }
    self.unError = function(e) {
      var i = e.initials;
      var er = GetPlayerVal(i,"errors") - 1;
      var eb = GetPlayerVal(i,"errorBlocks");
      if(er<0)return;
      if(er < eb){
        UpdatePlayer(i, "errorBlocks", er);
		    UpdateTeam("errorBlocks",-1);
      }
      var t = GetPlayerVal(i,"totalAttempts") - 1;
      UpdatePlayer(i, "errors", er);
	    UpdateTeam("errors",-1);
      UpdateHittingStats(i, t);
    }
    self.addErrorBlock = function(e) {
      var i = e.initials;
      var er = GetPlayerVal(i,"errors") + 1;
      var t = GetPlayerVal(i,"totalAttempts") + 1;
      UpdatePlayer(i, "errors", er);
	    UpdateTeam("errors",1);
      var eb = GetPlayerVal(i,"errorBlocks") + 1;
      UpdatePlayer(i, "errorBlocks", eb);
	    UpdateTeam("errorBlocks",1);
      UpdateHittingStats(i, t);
    }
    self.unErrorBlock = function(e) {
      var i = e.initials;
      var eb = GetPlayerVal(i,"errorBlocks") - 1;
      if(eb<0)return;
      var t = GetPlayerVal(i,"totalAttempts") - 1;
      UpdatePlayer(i, "errorBlocks", eb);
	    UpdateTeam("errorBlocks",-1);
      var er = GetPlayerVal(i,"errors") - 1;
      UpdatePlayer(i, "errors", er);
	    UpdateTeam("errors",-1);
      UpdateHittingStats(i, t);
    }
    self.addAttempt = function(e) {
      var i = e.initials;
      var a = GetPlayerVal(i,"attempts") + 1;
      var t = GetPlayerVal(i,"totalAttempts") + 1;
      UpdatePlayer(i, "attempts", a);
	    UpdateTeam("attempts",1);
      UpdateHittingStats(i, t);
    }
    self.unAttempt = function(e) {
      var i = e.initials;
      var a = GetPlayerVal(i,"attempts") - 1;
      if(a<0)return;
      var t = GetPlayerVal(i,"totalAttempts") - 1;
      UpdatePlayer(i, "attempts", a);
	    UpdateTeam("attempts",-1);
      UpdateHittingStats(i, t);
    }
    self.pass3 = function(e) {
      Pass(e.initials, "p3", 1);
      UpdateTeam("p3",1);
      UpdateTeamPassStats();
    }
    self.pass2 = function(e) {
      Pass(e.initials, "p2", 1);
      UpdateTeam("p2",1);
      UpdateTeamPassStats();
    }
    self.pass1 = function(e) {
      Pass(e.initials, "p1", 1);
      UpdateTeam("p1",1);
      UpdateTeamPassStats();
    }
    self.pass0 = function(e) {
      Pass(e.initials, "p0", 1);
      UpdateTeam("p0",1);
      UpdateTeamPassStats();
    }

    self.serve4 = function(e) {
      Serve(e.initials, "s4", 1);
      UpdateTeam("s4",1);
      UpdateTeamServeStats();
    }
    self.serve3 = function(e) {
      Serve(e.initials, "s3", 1);
      UpdateTeam("s3",1);
      UpdateTeamServeStats();
    }
    self.serve2 = function(e) {
      Serve(e.initials, "s2", 1);
      UpdateTeam("s2",1);
      UpdateTeamServeStats();
    }
    self.serve1 = function(e) {
      Serve(e.initials, "s1", 1);
      UpdateTeam("s1",1);
      UpdateTeamServeStats();
    }
    self.serve0 = function(e) {
      Serve(e.initials, "s0", 1);
      UpdateTeam("s0",1);
      UpdateTeamServeStats();
    }

}

// i=player param=parameter val= 1|-1
function Pass(i,param,val)
{
  var p = GetPlayerVal(i,param) + val;
  var tp = GetPlayerVal(i,"totalPass") + val;
  UpdatePlayer(i, param, p);
  UpdatePassStats(i, tp);
}

// i=player param=parameter val= 1|-1
function Serve(i,param,val)
{
  var p = GetPlayerVal(i,param) + val;
  var ts = GetPlayerVal(i,"totalServe") + val;
  UpdatePlayer(i, param, p);
  UpdateServeStats(i, ts)
}

function UpdateHittingStats(i, t)
{
  var z = 0;
  z = z.toFixed(3);
  var er = GetPlayerVal(i,"errors");
  var eb = GetPlayerVal(i,"errorBlocks");
  var k = GetPlayerVal(i,"kills");
  var a = GetPlayerVal(i,"attempts");
  if(t!=0)
  {
    var p = ((k - er)/t).toFixed(3);
    if(er!=0){
      var ep = (er/t).toFixed(3);
      UpdatePlayer(i, "errPercent", ep);
      var ep = ((er-eb)/t).toFixed(3);
      UpdatePlayer(i, "unfErrPercent", ep);
    }
    else {
      UpdatePlayer(i, "errPercent", z);
      UpdatePlayer(i, "unfErrPercent", z);
    }
    UpdatePlayer(i, "percentage", p);
  }
  else { //If tot. attempts is 0
    UpdatePlayer(i, "percentage", z);
    UpdatePlayer(i, "errPercent", z);
    UpdatePlayer(i, "unfErrPercent", z);
  }
  UpdatePlayer(i, "totalAttempts", t);
  UpdateTeamHittingStats();
}

function UpdateTeamHittingStats()
{
	var z = 0;
	z = z.toFixed(3);

	var er = viewmodel.teamStats.errors;
	var eb = viewmodel.teamStats.errorBlocks;
	var k = viewmodel.teamStats.kills;
	var a = viewmodel.teamStats.attempts;
	var t = viewmodel.teamStats.totalAttempts;
	if(t!=0)
	{
		var p = ((k - er)/t).toFixed(3);
		if(er!=0){
		  var ep = (er/t).toFixed(3);
		  viewmodel.teamStats.errPercent = ep;
		  var ep = ((er-eb)/t).toFixed(3);
		  viewmodel.teamStats.unfErrPercent = ep;
		}
		else {
		  viewmodel.teamStats.errPercent = z;
		  viewmodel.teamStats.unfErrPercent = z;
		}
		viewmodel.teamStats.percentage = p;
	}
	else { //If tot. attempts is 0
		viewmodel.teamStats.percentage = z;
		viewmodel.teamStats.errPercent = z;
		viewmodel.teamStats.unfErrPercent = z;
	}
	UpdateTeamDisplay();
}

function UpdateTeamServeStats()
{
  var z = 0;
  z = z.toFixed(3);
  var s0 = viewmodel.teamStats.s0;
  var s1 = viewmodel.teamStats.s1;
  var s2 = viewmodel.teamStats.s2;
  var s3= viewmodel.teamStats.s3;
  var s4 = viewmodel.teamStats.s4;
  var ts = s0 + s1 + s2 + s3 + s4;

  UpdateTeam("totalServe",ts);

  if(ts != 0)
  {
    var as = ((s4 * 4 + s3 * 3 + s2 * 2 + s1 - s0) / ts).toFixed(3);
    UpdateTeam("avgServe", as);
  }
  else {
    UpdateTeam("avgServe", z);
  }
  UpdateTeamServePassDisp();
}

function UpdateTeamPassStats()
{
  var z = 0;
  z = z.toFixed(3);

  var p3 = viewmodel.teamStats.p3;
  var p2 = viewmodel.teamStats.p2;
  var p1 = viewmodel.teamStats.p1;
  var p0 = viewmodel.teamStats.p0;
  var tp = p3 + p2 + p1 + p0;

  UpdateTeam("totalPass", tp);

  if(tp != 0)
  {
    var ap = ((p3 * 3 + p2 * 2 + p1 - p0) / tp).toFixed(3);
    UpdateTeam("avgPass", ap);
  }
  else {
    UpdateTeam("avgPass", z);
  }
  UpdateTeamServePassDisp();
}

function UpdatePassStats(i, tp)
{
  var p3 = GetPlayerVal(i,"p3")
  var p2 = GetPlayerVal(i,"p2")
  var p1 = GetPlayerVal(i,"p1")
  var p0 = GetPlayerVal(i,"p0")
  UpdatePlayer(i, "totalPass", tp);

  if(tp != 0)
  {
    var ap = ((p3 * 3 + p2 * 2 + p1 - p0) / tp).toFixed(3);
    UpdatePlayer(i, "avgPass", ap);
  }
  else {
    UpdatePlayer(i, "avgPass", "0");
  }
}

function UpdateServeStats(i, ts)
{
  var s4 = GetPlayerVal(i,"s4")
  var s3 = GetPlayerVal(i,"s3")
  var s2 = GetPlayerVal(i,"s2")
  var s1 = GetPlayerVal(i,"s1")
  var s0 = GetPlayerVal(i,"s0")
  UpdatePlayer(i, "totalServe", ts);

  if(ts != 0)
  {
    var as = ((s4 * 4 + s3 * 3 + s2 * 2 + s1 - s0) / ts).toFixed(3);
    UpdatePlayer(i, "avgServe", as);
  }
  else {
    UpdatePlayer(i, "avgServe", "0");
  }
}

function UpdatePlayer(initials, param, val)
{
 viewmodel.players()[vbTeam(initials)][param](val);
}

// param=parameter val = 1|-1
function UpdateTeam(param, val)
{
  switch(param)
  {
	case "kills":
		viewmodel.teamStats.kills = viewmodel.teamStats.kills + val;
		break;
	case "errors":
		viewmodel.teamStats.errors = viewmodel.teamStats.errors + val;
		break;
	case "errorBlocks":
		viewmodel.teamStats.errorBlocks = viewmodel.teamStats.errorBlocks + val;
		//Add this to negate the double attempt add
		viewmodel.teamStats.totalAttempts = viewmodel.teamStats.totalAttempts - val;
		break;
	case "attempts":
		viewmodel.teamStats.attempts = viewmodel.teamStats.attempts + val;
		break;
	case "totalAttempts":
		viewmodel.teamStats.totalAttempts = viewmodel.teamStats.totalAttempts + val;
		break;
	case "percentage":
		viewmodel.teamStats.percentage = val;
		break;
	case "errPercent":
		viewmodel.teamStats.errPercent = val;
		break;
	case "unfErrPercent":
		viewmodel.teamStats.unfErrPercent = val;
		break;
  case "p0":
    viewmodel.teamStats.p0 = viewmodel.teamStats.p0 + val;
    break;
  case "p1":
    viewmodel.teamStats.p1 = viewmodel.teamStats.p1 + val;
    break;
  case "p2":
    viewmodel.teamStats.p2 = viewmodel.teamStats.p2 + val;
    break;
  case "p3":
    viewmodel.teamStats.p3 = viewmodel.teamStats.p3 + val;
    break;
  case "avgPass":
    viewmodel.teamStats.avgPass = val;
    break;
  case "totalPass":
    viewmodel.teamStats.totalPass = val;
    break;
  case "s0":
    viewmodel.teamStats.s0 = viewmodel.teamStats.s0 + val;
    break;
  case "s1":
    viewmodel.teamStats.s1 = viewmodel.teamStats.s1 + val;
    break;
  case "s2":
    viewmodel.teamStats.s2 = viewmodel.teamStats.s2 + val;
    break;
  case "s3":
    viewmodel.teamStats.s3 = viewmodel.teamStats.s3 + val;
    break;
  case "s4":
    viewmodel.teamStats.s4 = viewmodel.teamStats.s4 + val;
    break;
  case "avgServe":
    viewmodel.teamStats.avgServe = val;
    break;
  case "totalServe":
    viewmodel.teamStats.totalServe = val;
    break;
	default:
		break;
  }

  if(param == "p0" || param == "p1" || param =="p2" || param == "p3")
  {
    viewmodel.teamStats.totalPass = viewmodel.teamStats.totalPass + val;
  }
  else if(param == "s0" || param == "s1" || param =="s2" || param == "s3" || param == "s4")
  {
    viewmodel.teamStats.totalServe = viewmodel.teamStats.totalServe + val;
  }
  else if(param != "totalServe" && param != "totalPass" && param != "avgPass"  && param != "avgServe")
  {
    viewmodel.teamStats.totalAttempts = viewmodel.teamStats.totalAttempts + val;
  }
}

function GetPlayerVal(initials, param)
{
   return viewmodel.players()[vbTeam(initials)][param]();
}

function AddActionBlock(blockVal,blockClass)
{
  $( "#actions" ).append( "<div class='" + blockClass + " actionBox'>" + blockVal + "</div>" );
}

function AddHistoryBlock(blockVal,blockClass)
{
  $( "#history" ).prepend( "<div class='" + blockClass + " actionBox'>" + blockVal + "</div>" );
}

function RecordAction(player,action, rating)
{
  var p = viewmodel.players()[vbTeam(player)];
  if(typeof p != 'undefined')
  {
    if(action == "kill")
      viewmodel.addKill(p);
    if(action == "attempt")
      viewmodel.addAttempt(p);
    if(action == "error")
      viewmodel.addError(p);
    if(action == "errorBlock")
      viewmodel.addErrorBlock(p);
    if(action == "pass"){
      switch(rating){
        case "0":
          viewmodel.pass0(p);
          break;
        case "1":
          viewmodel.pass1(p);
          break;
        case "2":
          viewmodel.pass2(p);
          break;
        case "3":
          viewmodel.pass3(p);
          break;
      }
    }
    if(action == "serve"){
      switch(rating){
        case "0":
          viewmodel.serve0(p);
          break;
        case "1":
          viewmodel.serve1(p);
          break;
        case "2":
          viewmodel.serve2(p);
          break;
        case "3":
          viewmodel.serve3(p);
          break;
        case "4":
          viewmodel.serve4(p);
          break;
      }
    }
    player = p.first;
  }
  if(typeof rating != 'undefined'){
    if(rating == "4")
    {
      AddActionBlock("Ace: " + player, "kill");
      AddHistoryBlock("Ace: " + player, "kill");
    }
    else
    {
      AddActionBlock(action + "(" + rating + "): " + player, action);
      if(action == "pass" || action == "serve")
      {
        AddHistoryBlock(action + "(" + rating + "): " + player, action);
      }
    }

  }
  else {
    AddActionBlock(action + ": " + player, action);
  }
}

function passToServe(p)
{
  switch(p)
  {
    case "3":
      return "1";
    case "2":
      return "2";
    case "1":
      return "3";
    case "0":
      return "4";
  }
}

function getNext(tex,last)
{
  var next = tex.indexOf(" ", last + 1);
  if(next == -1) next = tex.length;
  return next;
}

function RecordRally()
{
  $( "#actions" ).empty();
  var tex = $("#input").val();
  ParseRally(tex);
}

function ParseRally(tex)
{
  var lastSpace = 0;
  var newSpace = 0;
  var newBlock = "";
  var action = "";
  var player = "";
  var passer = "";
  var rating = 0;
  var s = "";
  var p = "";
  var i = 0;
  while(i<=tex.length)  {
    newSpace = getNext(tex,lastSpace);
    if(i == 0)
    {
      player = tex.substring(lastSpace,newSpace).trim();
      if(player == "fb")        {
          AddActionBlock("FreeBall","","");
          AddHistoryBlock("FreeBall","","");
          i++;
          lastSpace = newSpace;
          continue;
        }
        if(player == "match")
        {
          inPractice = false;
          $( "#actions" ).empty();
          AddActionBlock("Switched to Match Mode","","");
          break;
        }
        if(player == "practice")
        {
          inPractice = true;
          $( "#actions" ).empty();
          AddActionBlock("Switched to practice Mode","","");
          break;
        }
        if(player == "rm"){
          lastSpace = newSpace;
          newSpace = getNext(tex,lastSpace);
          player = tex.substring(lastSpace,newSpace).trim();
          lastSpace = newSpace;
          newSpace = getNext(tex,lastSpace);
          action = tex.substring(lastSpace,newSpace).trim();
          if(action == "k") action = "kills";
          if(action == "er") action = "errors";
          if(action == "eb") action = "errors"
            ModifyPlayer(player, "errorBlocks", -1);
          if(action == "a") action = "attempts";
          ModifyPlayer(player, action, -1);
          //viewmodel.players()[vbTeam(player)][action](viewmodel.players()[vbTeam(player)][action]() - 1);
          if(action == "kills" || action == "errors" || action == "errorBlocks" || action == "attempts")
            ModifyPlayer(player, "totalAttempts", -1);
          else if(action == "p0" || action == "p1" ||action == "p2" ||action == "p3")
            ModifyPlayer(player, "totalPass", -1);
          else
            ModifyPlayer(player, "totalServe", -1);
          break;
        }
        if(inPractice)
        {
          lastSpace = newSpace;
          newSpace = getNext(tex,lastSpace);
          passer = tex.substring(lastSpace,newSpace).trim();
          if(passer == "er")
          {
            RecordAction(player, "serve", "0");
            break;
          }
          lastSpace = newSpace;
          newSpace = getNext(tex,lastSpace);
          rating = tex.substring(lastSpace,newSpace).trim();
          RecordAction(player,"serve",passToServe(rating));
          RecordAction(passer,"pass",rating);
          lastSpace = newSpace;
          i = i + 3;
          if(rating == "0" || rating == "4")
            break;
          continue;
        }
        else {
          newSpace = getNext(tex,lastSpace);
          action = tex.substring(lastSpace,newSpace).trim();

          lastSpace = newSpace;
          newSpace = getNext(tex,lastSpace);
          player = tex.substring(lastSpace,newSpace).trim();

          lastSpace = newSpace;
          newSpace = getNext(tex,lastSpace);
          rating = tex.substring(lastSpace,newSpace).trim();
          lastSpace = newSpace;

          if(action == "s")
          {
            RecordAction(player,"serve",rating);
            i+=lastSpace;
            if(rating == "0" || rating == "4")
              break;
            continue;
          }
          RecordAction(player,"pass",rating);
          i+=lastSpace;
          if(rating == "0" || rating == "4")
            break;
          continue;
        }
    }

    if(newSpace == tex.length)
    {
      if(inPractice)
      {
        AddActionBlock("Abrupt End","error");
        break;
      }
      else {
        AddActionBlock("End rally","");
        break;
      }
    }

    player = tex.substring(lastSpace,newSpace).trim();
    lastSpace = newSpace;
    newSpace = getNext(tex,lastSpace);
    action = getAction(tex.substring(lastSpace,newSpace).trim());
    RecordAction(player, action);
    if(action == "kill" || action == "error" || action == "errorBlock")
      break;
    i++;

  }
}

function ModifyPlayer(initials, action, val)
{
  if(typeof(val) == undefined)
    val = 1;
  viewmodel.players()[vbTeam(initials)][action](viewmodel.players()[vbTeam(initials)][action]() + val);
}

function getAction(a){
  if(a == "k")
    return "kill";
  if(a == "er")
    return "error";
  if(a == "eb")
    return "errorBlock";
  return "attempt";
}

function PlayersToJSON(){
  var j = '[';
  var player = "";
  for (var i in viewmodel.players())
  {
    j+='{';
    player = viewmodel.players()[i];
    j+= '"number":"' + player["number"] + '","initials":"'+ player["initials"] + '","last":"' + player["last"] + '","first":"' + player["first"] + '","kills":"';
    j+= player["kills"]() + '","errors":"'+ player["errors"]() + '","errorBlocks":"'+ player["errorBlocks"]() + '","attempts":"' + player["attempts"]() + '","p3":"' + player["p3"]() + '","p2":"';
    j+= player["p2"]() + '","p1":"'+ player["p1"]() + '","p0":"' + player["p0"]() + '","s4":"' + player["s4"]() + '","s3":"';
    j+= player["s3"]() + '","s2":"'+ player["s2"]() + '","s1":"' + player["s1"]() + '","s0":"' + player["s0"]() + '"},';
  }
  j = j.substring(0,j.length - 1);
  j+= ']';
  console.log(j);
  return j;
}

function TodayDate(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!

  if(dd<10) {
      dd='0'+dd
  }

  if(mm<10) {
      mm='0'+mm
  }

  return mm+'-'+dd;
}

function InitializeTeamStats()
{
	viewmodel.teamStats.kills = 0;
	viewmodel.teamStats.errors = 0;
	viewmodel.teamStats.errorBlocks = 0;
	viewmodel.teamStats.attempts = 0;
	viewmodel.teamStats.totalAttempts = 0;
	viewmodel.teamStats.percentage = 0;
	viewmodel.teamStats.errPercent = 0;
	viewmodel.teamStats.unfErrPercent = 0;

  viewmodel.teamStats.p0 = 0;
  viewmodel.teamStats.p1 = 0;
  viewmodel.teamStats.p2 = 0;
  viewmodel.teamStats.p3 = 0;
  viewmodel.teamStats.avgPass = 0;
  viewmodel.teamStats.totalPass = 0;

  viewmodel.teamStats.s0 = 0;
  viewmodel.teamStats.s1 = 0;
  viewmodel.teamStats.s2 = 0;
  viewmodel.teamStats.s3 = 0;
  viewmodel.teamStats.s4 = 0;
  viewmodel.teamStats.totalServe = 0;
  viewmodel.teamStats.avgServe = 0;
}

function UpdateTeamDisplay()
{
	$("#killsDisp").html(viewmodel.teamStats.kills);
	$("#errorsDisp").html(viewmodel.teamStats.errors);
	$("#errorBlocksDisp").html(viewmodel.teamStats.errorBlocks);
	$("#attemptsDisp").html(viewmodel.teamStats.attempts);
	$("#totalAttemptsDisp").html(viewmodel.teamStats.totalAttempts);
	$("#percentageDisp").html(viewmodel.teamStats.percentage);
	$("#errPercentDisp").html(viewmodel.teamStats.errPercent);
	$("#unfErrPercentDisp").html(viewmodel.teamStats.unfErrPercent);

  $("#pointsForDisp").html(viewmodel.teamStats.s4 + viewmodel.teamStats.kills + viewmodel.teamStats.errorBlocks);
  $("#pointsAgainstDisp").html(viewmodel.teamStats.s0 + viewmodel.teamStats.p0 + viewmodel.teamStats.errors);
}

function UpdateTeamServePassDisp()
{
    $("#acesDisp").html(viewmodel.teamStats.s4);
    $("#serveErrDisp").html(viewmodel.teamStats.s0);
    $("#avgServeDisp").html(viewmodel.teamStats.avgServe);
    $("#perfectPassDisp").html(viewmodel.teamStats.p3);
    $("#poorPassDisp").html(viewmodel.teamStats.p0);
    $("#avgPassDisp").html(viewmodel.teamStats.avgPass);

    $("#pointsForDisp").html(viewmodel.teamStats.s4 + viewmodel.teamStats.kills + viewmodel.teamStats.errorBlocks);
    $("#pointsAgainstDisp").html(viewmodel.teamStats.s0 + viewmodel.teamStats.p0 + viewmodel.teamStats.errors);
}

$("#exportHittingButton").click(function(){
  var fname = "HittingStats_" + TodayDate();
  $("#hittingTable").table2excel({
    // exclude CSS class
    exclude: ".noExl",
    name: "Worksheet Name",
    filename: fname
  });
});
$("#exportServingButton").click(function(){
  var fname = "ServingStats_" + TodayDate();
  $("#servingTable").table2excel({
    // exclude CSS class
    exclude: ".noExl",
    name: "Worksheet Name",
    filename: fname
  });
});


$( document ).ready(function() {
  viewmodel =  new PlayersViewModel();
  InitializeTeamStats();
  ko.applyBindings(viewmodel);

  $("#input").keyup(function (e) {
    if (e.keyCode == 13) {
        RecordRally();
        $("#input").val("");
        $("#input").focus();
        }
    });
});
