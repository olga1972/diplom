<?php
/* Осуществляем проверку вводимых данных и их защиту от враждебных 
скриптов */
    $project_name = trim($_POST["project_name"]);
	$admin_email  = trim($_POST["admin_email"]);
	$form_subject = trim($_POST["form_subject"]);
/* Устанавливаем e-mail адресата */
$myemail = "olga.sadyreva@mail.ru";
/* Проверяем заполнены ли обязательные поля ввода, используя check_input 
функцию 
$Name = check_input($_POST["Name"], "Введите ваше Ф.И.О.!");
$Adress = check_input($_POST["Adress"], "Укажите ваш адрес!");
$Еmail = check_input($_POST["Еmail"], "Введите ваш e-mail!");
$comments = check_input($_POST["comments"], "Вы забыли написать сообщение!");
/* Проверяем правильно ли записан e-mail 
if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $email))
{
show_error("<br /> Е-mail адрес не существует");
}*/
/* Создаем новую переменную, присвоив ей значение */
$comments_to_myemail = "Здравствуйте! 
Вашей контактной формой было отправлено сообщение! 
Имя отправителя: $project_name
E-mail: $admin_email
Текст сообщения: $form_subject 
Конец";
/* Отправляем сообщение, используя mail() функцию */
/*$from  = "From: $project_name <$admin_email> \r\n Reply-To: $email \r\n"; */
mail($myemail, $comments_to_myemail);
?>
<p>Ваше сообщение было успешно отправлено!</p>
<p>На <a href="index.html">Главную >>></a></p>
<?php
/* Если при заполнении формы были допущены ошибки сработает 
следующий код: */
function check_input($data, $problem = "")
{
$data = trim($data);
$data = stripslashes($data);
$data = htmlspecialchars($data);
if ($problem && strlen($data) == 0)
{
show_error($problem);
}
return $data;
}
function show_error($myError)
{
?>
<html>
<body>
<p>Пожалуйста исправьте следующую ошибку:</p>
<?php echo $myError; ?>
</body>
</html>
<?php
exit();
}
?>

</body>
</html>