<template>

	<form class="form">
		<h1>Login</h1>
		<label >Username:</label>
		<input type="text" id="username"></input>

		<label>Password:</label>
		<input type="text" id="password"></input>

		<button type="button" @click="form_submit(e)">Submit</button>
	</form>
</template>

<script setup>
	import '../assets/styles/login.css'

    function form_submit(e) {
        let user = username.value
        let pass = password.value

        console.log(user)
        console.log(pass)
    }

</script>