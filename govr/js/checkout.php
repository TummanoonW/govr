<?php

require_once dirname(__FILE__).'/omise-php/lib/Omise.php';
define('OMISE_API_VERSION', '2015-11-17');

define('OMISE_PUBLIC_KEY', 'pkey_test_5nw5dlqajzq9gdwvuba');
define('OMISE_SECRET_KEY', 'skey_test_5nw5dlqahb02p9ottc4');

$charge = OmiseCharge::create(array(
  'amount' => 10025,
  'currency' => 'thb',
  'card' => $_POST["omiseToken"]
));

echo($charge['status']);

print('<pre>');
print_r($charge);
print('</pre>');
?>