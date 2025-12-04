<!-- Página descartada -->

<?php
    session_start();
    $_SESSION['quadrinho'] = 1;
?>

<html>
    <form action="cria_capitulo.php" method="POST" enctype="multipart/form-data">
        Inserir voz:
        </br>
        </br>
        <label for="capitulo" class="etiqueta2">Nome do áudio:</label>
        </br>
        <input value="" name="capitulo" type="number" class="input2"/>
        </br>
        <label for="arquivo" class="etiqueta2">Arquivo de voz:</label>
        </br>
        <input type="file" name="arquivo" class="input2">
        </br>
        <label for="categoria" class="etiqueta2">Categorias:</label>
        </br>
        <select value="" name="categoria[]" class="etiqueta2" multiple size = 7>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Grave">Grave</option>
            <option value="Agudo">Agudo</option>
            <option value="Adulto">Adulto</option>
            <option value="Infantil">Infantil</option>
            <option value="Outro">Outro</option>
        </select>
        </br>
        <label for="descaudio" class="etiqueta2">Descrição do áudio:</label>
        </br>
        <input value="" name="descaudio" type="text" class="input2"/>
        </br>
        <button type="submit" name="submit"> Enviar áudio </button>
    </form>
</html>