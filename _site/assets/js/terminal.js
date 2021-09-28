Terminal = {
  recent: [],
  recentpos: -1
}

help = '<p>List of commands available:<br/>    * whoami: brief bio<br/>    * education: colleges I have attended<br/>    * awards: my achievements and certifications<br/>    * experience: where I have worked<br/>    * skills: <s>a lot</s> useless command<br/>    * lang: languages<br/>    * clear: clean the screen</p>'

whoami = '<p>My full name is Marcos Horro Varela, but I usually write my name as Markos. I am from Cambados, a little town in Galicia, but I am currently living in A Coruña.</p>'

edu = '<p>Universidade da Coruna (UDC)<br/>Masters degree (MSc), Computer Engineering<br/>2016-2018<hr/>Chalmers University of Technology<br/>Masters degree, Computer Sciece (Erasmus student)<br/>2015-2016<hr/>Universidade da Coruña (UDC)<br/>Bachelor of Science (BSc), Computer Science<br/>2012-2016<hr/>Mathematics<br/>UNED (Universidad Nacional de Educación a Distancia)<br/>2014-2015 (willing to return)</p>'

lang = '<p>* Spanish and Galician (native)<br/>    * English CAE C1 Certificate</p>'

award = '<p>AWARDS:<br/><br/>HiPEAC Paper award for presenting article at DAC, Las Vegas (2019)<br/><hr><br/>Best Student Record: Computer Engineering<br/>University of A Coruña (2016)<br/><hr>Academic Excellence Award<br/>Galicia Goverment (2012)<br/>Honors in High School 9.47/10<hr/>CERTIFICATES:<br/>Mathematics Congress<br/>AGAPEMA, License 1207130 (from September 2012)</p>'

exp = '<p>My activity has been, at the moment, focused on the University:<br/>    * PhD Candidate/Assistant Lecturer: september 2017 - present. Computer Architecture Group, Universidade da Coruña (UDC)<br/>    * Research intern: september 2016 - september 2017. Universidade da Coruña<br/>    * Initiation to department research internship: january 2015 - june 2015. Universidade da Coruña<br/>    * Student representative Department of Electronics and Systems (Universidade da Coruña)<br/>    * Project Mentoring (2014-) (Universidade da Coruña)</p>'

skills = '<p>Programming languages (more to less experience):<br/>Python, C, C++, Android, Java, VHDL, web languages <hr/>Interested in:<br/>research, computer architecture, high performance computing, computer graphics, mobile computing, music, piano, guitar, motorbikes, cinema, digital photography, soccer, design</p>'

var attemptSkills = 1;

$(function () {
  Terminal.focus = function () {
    $('.cmd-ln.active').focus();
    $('#terminal').scrollTop($('#terminal')[0].scrollHeight);
  }
  Terminal.inputKeyup = function (evt, target) {
    var self = target;
    if (evt.keyCode === 13 && $.trim(self.val()) !== '') {
      Terminal.recent.push(self.val());
      if (self.val() === 'help') {
        self.parent().append(help);
      } else if (self.val() === 'whoami') {
        self.parent().append(whoami);
      } else if (self.val() === 'education') {
        self.parent().append(edu);
      } else if (self.val() === 'awards') {
        self.parent().append(award);
      } else if (self.val() === 'experience') {
        self.parent().append(exp);
      } else if (self.val() === 'lang') {
        self.parent().append(lang);
      } else if (self.val() === 'skills') {
        window.open("error.html", "_self");
      } else if (self.val() === 'clear') {
        $('#terminal').html('');
      } else {
        self.parent().append('<p>command not found: ' + self.val() + '</p>');
      }
      self.removeClass('active').attr('disabled', 'disabled');
      $('#terminal').append('<div class="line"><span class="cmd-p">markoshorro@cv: ~$ </span><input class="cmd-ln active" type="text"></div>');
      $('.cmd-ln.active').keyup(function (e) {
        Terminal.inputKeyup(e, $(this));
      });
      Terminal.recentpos = -1;
      Terminal.focus();
    } else if (evt.keyCode === 38) {
      if (Terminal.recentpos < 0 || Terminal.recentpos > Terminal.recent.length - 1) {
        Terminal.recentpos = -1;
      }
      if (Terminal.recentpos === -1 && Terminal.recent.length !== 0) {
        self.val(Terminal.recent[Terminal.recent.length - 1]);
        Terminal.recentpos = Terminal.recent.length - 1;
      } else {
        self.val(Terminal.recent[Terminal.recentpos - 1]);
        Terminal.recentpos = Terminal.recentpos - 1;
      }
    } else if (evt.keyCode === 40) {
      if (Terminal.recentpos < 0 || Terminal.recentpos > Terminal.recent.length - 1) {
        Terminal.recentpos = -1;
      }
      if (Terminal.recentpos === -1 && Terminal.recent.length !== 0) {
        self.val(Terminal.recent[0]);
        Terminal.recentpos = 0;
      } else {
        self.val(Terminal.recent[Terminal.recentpos + 1]);
        Terminal.recentpos = Terminal.recentpos + 1;
      }
    }
    Terminal.focus();
  }
  $('#terminal').append('<div class="line"><span class="cmd-p">markoshorro@cv: ~$ </span><input class="cmd-ln active" type="text"><span class="cursor"></span></div>');
  $('#terminal').click(function (e) {
    $('.cmd-ln.active').focus();
  });
  $('.cmd-ln.active').keyup(function (e) {
    Terminal.inputKeyup(e, $(this));
  });
  Terminal.focus();
});
