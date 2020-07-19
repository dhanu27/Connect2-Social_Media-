// create a class to toggle likes when a link is clicked, using AJAX
class ToggleFriend{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleFriend();
    }
    toggleFriend(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;
            // this is a new way of writing ajax which you might've studied, it looks like the same as promises
            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
            })
            .done(function(data) {
               let $action=$(self).html();
               console.log($action);
                 if($action==='Add'){
                    $(self).html('Remove');
                 }else{
                    $(self).html('Add');
                 }
            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });
        });
    }
}
