const queue=require('../config/kue');
const forgotPasswordMailer=require('../mailers/forgot_mailer'); 
queue.process('emails', function(job, done){
     console.log("emails worker processing a job",job.data);
     forgotPasswordMailer.forgotPassword(job.data);
     done();
});

