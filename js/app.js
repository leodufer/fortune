$(function() {
	$('#content').load('template/apuestas/apuesta.html',function(data){
			var apuestaTemplate;
			$.get('template/apuestas/apuesta_template.html',function(dom){
				apuestaTemplate = dom;
			});

			$.get('api/partido',function(data){
				for (var i = data.length - 1; i >= 0; i--) {
					partido = data[i];
					var apuestaData = $(apuestaTemplate);
					apuestaData.find('#equipoa').append(partido.teamaname);
					apuestaData.find('#equipob').append(partido.teambname);
					apuestaData.find('#btnApostar button').click(addApuestaEvent(apuestaData,partido));
					$('#apuestasmain').append(apuestaData);
				};
			});
	});

	$('#new-ap').click(function(event) {
		$('#content').load('template/equipos/equipo.html',function(data){
			loadTime();
			$('#form-equipo').submit(function(event) {
				submitFormEquipo(event);
			});
		});
	});

	$('#new-mach').click(function(event) {
		$('#content').load('template/partidos/partido.html',function(data) {
			$.ajax({
				type:'GET',
				url:'api/equipo',
				success:function (data) {
					for (var i = data.length - 1; i >= 0; i--) {
						var e = data[i]
						op='<option value="'+e.id+'">'+e.nombre;
						$('#team-a').append(op);
						$('#team-b').append(op);
					};
				},
				error:function() {

				}
			});

			loadMach();
			$('#formPartido').submit(function(event) {
				submitFormPartido(event);
			});
		});
	});

	$('.apostar button').click(function(event) {
		$('#content').load('template/apuestas/apuesta.html',function(data){
			var apuestaTemplate;
			$.get('template/apuestas/apuesta_template.html',function(dom){
				apuestaTemplate = dom;
			});

			$.get('api/partido',function(data){
				for (var i = data.length - 1; i >= 0; i--) {
					partido = data[i];
					var apuestaData = $(apuestaTemplate);
					apuestaData.find('#equipoa').append(partido.teamaname);
					apuestaData.find('#equipob').append(partido.teambname);
					apuestaData.find('#btnApostar button').click(addApuestaEvent(apuestaData,partido));
					$('#apuestasmain').append(apuestaData);
				};
			});
		});
	});
});



function addApuestaEvent(dom,partido){
	var evento = function(event){
		var apuestaForm;
		$.get('template/apuestas/apuesta_formulario.html',function(data){
			apuestaForm = $(data);
			apuestaForm.find('#equipoaname').append(partido.teamaname);
			apuestaForm.find('#equipobname').append(partido.teambname);
			apuestaForm.find('#equipoa').attr('value', partido.teama);
			apuestaForm.find('#equipob').attr('value', partido.teamb);
			$('#apuestasmain').html(apuestaForm);

			$('#apuestaForm').submit(function(event) {
				event.preventDefault();
				console.log($('#apuestaForm').serialize());
			});	
		});
		
	}
	return evento;
}

function submitFormPartido(event) {
	event.preventDefault();
	$('#formPartido').hide(500);
	$.ajax({
		type:'POST',
		url:'api/partido',
		data:$('#formPartido').serialize(),
		success:function(data) {
			e = data[0];
			$('.result').show(500);
			row = '<tr class="text-left">';
			row += '<td>'+e.id;
			row += '<td>'+e.teamaname;
			row += '<td>'+e.teambname;
			row += '<td>'+e.estado;
			$('#tbmach tbody').prepend(row);
		},
		error:function() {

		}
	});
};

function selectTeamA(event,dom){
	console.log($(dom));
	$('#team-a').hide(1000);
	$('#team-a-detail').show(1000);
}

function selectTeamB(event,dom){
	console.log($(dom));
	$('#team-b').hide(1000);
	$('#team-b-detail').show(1000);
}

function submitFormEquipo (event) {
	
	event.preventDefault();

	$('.loader')
	.ajaxStart(function() { $(this).show(); })
	.ajaxStop(function() { $(this).hide(); });


	$('#form-equipo').hide(500,function() {
		$.ajax({
					type:'POST',
					url:'api/equipo',
					data:$('#form-equipo').serialize(),
					success:function (data) {
						console.log(data);
						e = data[0];
						$('.result').show(500);
						row = '<tr class="text-left">';
						row += '<td>'+e.id;
						row += '<td>'+e.nombre;
						$('#tbteam tbody').prepend(row);
					},
					error:function() {
						
					}
				});
	});
				
}
function loadTime(){
	$.ajax({
		type:'GET',
		url:'api/equipo',
		success:function (data) {
			for (var i = data.length - 1; i >= 0; i--) {
				e = data[i];
				row = '<tr class="text-left">';
				row += '<td>'+e.id;
				row += '<td>'+e.nombre;
				$('#tbteam tbody').append(row);
			};
		},
		error:function() {

		}
	});

}


function loadMach(){
	$.ajax({
		type:'GET',
		url:'api/partido',
		success:function (data) {
			for (var i = data.length - 1; i >= 0; i--) {
				e = data[i];
				row = '<tr class="text-left">';
				row += '<td>'+e.id;
				row += '<td>'+e.teamaname;
				row += '<td>'+e.teambname;
				row += '<td>'+e.estado;
				$('#tbmach tbody').append(row);
			};
		},
		error:function() {

		}
	});
}