let simpleTerm = {
  recent: [],
  recentpos: -1
}

let help = '<p>'                                           +
  'List of commands available:<br/>'                       +
  '    * whoami: brief bio<br/>'                           +
  '    * edu: colleges I have attended<br/>'               +
  '    * awards: my achievements and certifications<br/>'  +
  '    * exp: where I have worked<br/>'                    +
  '    * skills: useless command<br/>'                     +
  '    * lang: languages<br/>'                             +
  '    * clear: clean the screen'                          +
'</p>';

let whoami = '<p>' +
  'My full name is Marcos Horro Varela, but I usually write my name as Markos.'                 +
  'I am from Cambados, a little town in Galicia, but I am currently living in Dublin, Ireland.' +
  '</p>'

let education = '<p>' +
  'Universidade da Coruna (UDC)<br/>'                                          +
  'PhD, Computer Engineering<br/>'                                             +
  '2017-2022<hr/>'                                                             +
  'Universidade da Coruna (UDC)<br/>'                                          +
  'Masters degree (MSc), Computer Engineering<br/>'                            +
  '2016-2018<hr/>'                                                             +
  'Chalmers University of Technology<br/>'                                     +
  'Masters degree, Computer Science (Erasmus student)<br/>'                    +
  '2015-2016<hr/>'                                                             +
  'Universidade da Coruña (UDC)<br/>'                                          +
  'Bachelor of Science (BSc), Computer Science<br/>'                           +
  '2012-2016<hr/>Mathematics<br/>'                                             +
  'UNED (Universidad Nacional de Educación a Distancia)<br/>'                  +
  '2014-2015'                                                                  +
  '</p>';

let lang = '<p>'                             +
  '    * Spanish and Galician (native)<br/>' +
  '    * English CAE C1 Certificate'         +
  '</p>'

let award = '<p>'                                                                                 +
  'Awards:<br/><br/>'                                                                             +
  'PhD Cum Laude (2022)<br/><hr>'                                                                 +
  'HiPEAC Paper award for presenting article at DAC, Las Vegas (2019)<br/><hr>'                   +
  'Best Student Record: Computer Engineering<br/>University of A Coruña (2016)<br/><hr>'          +
  'Academic Excellence Award<br/>Galicia Goverment (2012)<br/>Honors in High School 9.47/10<hr/>';

let exp = '<p>' +
  '    * Computer Architect (Sr. Software Development Engineer): april 2022 - present. AMD.<br/>'                                       +
  '    * PhD Candidate/Assistant Lecturer: september 2017 - march 2022. Computer Architecture Group, Universidade da Coruña (UDC)<br/>' +
  '    * Research intern: september 2016 - september 2017. Universidade da Coruña<br/>'                                                 +
  '    * Research internship: january 2015 - june 2015. Universidade da Coruña<br/>'                                                    +
  '</p>';

$(function () {
  simpleTerm.focus = function () {
    $('.cmd-ln.active').focus();
    $('#terminal').scrollTop($('#terminal')[0].scrollHeight);
  }
  let newCmdLine = '<div class="line">' +
                        '<span class="cmd-p">markoshorro@cv: ~$ </span>' +
                        '<input class="cmd-ln active" type="text">'      +
                   '</div>';
  simpleTerm.inputKeyup = function (evt, target) {
    var self = target;
    if (evt.keyCode === 13 && $.trim(self.val()) !== '') {
      simpleTerm.recent.push(self.val());
      if (self.val() === 'help') {
        self.parent().append(help);
      } else if (self.val() === 'whoami') {
        self.parent().append(whoami);
      } else if (self.val() === 'edu') {
        self.parent().append(education);
      } else if (self.val() === 'awards') {
        self.parent().append(award);
      } else if (self.val() === 'exp') {
        self.parent().append(exp);
      } else if (self.val() === 'lang') {
        self.parent().append(lang);
      } else if (self.val() === 'skills') {
        $('#terminal').html('');
        window.open("error.html", "_self");
      } else if (self.val() === 'clear') {
        $('#terminal').html('');
      } else {
        self.parent().append('<p>bash: command not found: ' + self.val() + '</p>');
      }
      self.removeClass('active').attr('disabled', 'disabled');
      $('#terminal').append(newCmdLine);
      $('.cmd-ln.active').keyup(function (e) {
        simpleTerm.inputKeyup(e, $(this));
      });
      simpleTerm.recentpos = -1;
      simpleTerm.focus();
    } else if (evt.keyCode === 13 && $.trim(self.val()) === '') {
      self.removeClass('active').attr('disabled', 'disabled');
      $('#terminal').append(newCmdLine);
      $('.cmd-ln.active').keyup(function (e) {
        simpleTerm.inputKeyup(e, $(this));
      });
      simpleTerm.recentpos = -1;
      simpleTerm.focus();
    } else if (evt.keyCode === 38) {
      if (simpleTerm.recentpos < 0 || simpleTerm.recentpos > simpleTerm.recent.length - 1) {
        simpleTerm.recentpos = -1;
      }
      if (simpleTerm.recentpos === -1 && simpleTerm.recent.length !== 0) {
        self.val(simpleTerm.recent[simpleTerm.recent.length - 1]);
        simpleTerm.recentpos = simpleTerm.recent.length - 1;
      } else {
        self.val(simpleTerm.recent[simpleTerm.recentpos - 1]);
        simpleTerm.recentpos = simpleTerm.recentpos - 1;
      }
    } else if (evt.keyCode === 40) {
      if (simpleTerm.recentpos < 0 || simpleTerm.recentpos > simpleTerm.recent.length - 1) {
        simpleTerm.recentpos = -1;
      }
      if (simpleTerm.recentpos === -1 && simpleTerm.recent.length !== 0) {
        self.val(simpleTerm.recent[0]);
        simpleTerm.recentpos = 0;
      } else {
        self.val(simpleTerm.recent[simpleTerm.recentpos + 1]);
        simpleTerm.recentpos = simpleTerm.recentpos + 1;
      }
    }
    simpleTerm.focus();
  }
  $('#terminal').append(newCmdLine);
  $('#terminal').click(function (e) {
    $('.cmd-ln.active').focus();
  });
  $('.cmd-ln.active').keyup(function (e) {
    simpleTerm.inputKeyup(e, $(this));
  });
  simpleTerm.focus();
});
