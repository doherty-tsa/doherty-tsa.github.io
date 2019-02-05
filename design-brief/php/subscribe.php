<?php

/*
 * ------------------------------------
 * Mailchimp Email Configuration
 * ------------------------------------
 */

/*
---------------------
  THINGS TO CHANGE
---------------------
1. Mailchimp API Key
2. Mailchimp List ID
3. Subscriber Status
---------------------
*/

$apiKey       = 'ENTER_YOUR_MAILCHIMP_API_KEY_HERE'; /*1. Your Mailchiimp API Key*/
$listId       = 'LIST_ID_HERE'; /*2. Mailchimp List ID*/
$email        = $_POST['email'];
$status       = 'pending'; /* 3. subscribed, pending (Double-optin) */
$fname        = $_POST['fname']; 
$lname        = ''; 
$datacenter   = substr($apiKey,strpos($apiKey,'-')+1); /* Do not edit this line unless needed */
$post_url     = 'https://' . $datacenter . '.api.mailchimp.com/3.0/lists/' . $listId . '/members/'; /* Do not edit this line unless needed */

/*
Need to capture First name and last name? use this.
$fname        = $_POST['fname'];
$lname        = $_POST['lname'];
*/


/*
 * ------------------------------------
 * END CONFIGURATION
 * ------------------------------------
 */

/*
 * -------------------------------------------------
 * NERD STUFF BELOW, ONLY EDIT IF YOU ARE A PRO
 * -------------------------------------------------
 */

$json = json_encode(array(
    "email_address" => $email,
    "status" => $status,
    "merge_fields" => array(
        'FNAME' => $fname,
        'LNAME' => $lname
    )
));


    $ch = curl_init($post_url);

    curl_setopt($ch, CURLOPT_USERPWD, 'user:' . $apiKey);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $json);                                                                                                                 

    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $data = json_decode($result);
 
    curl_close($ch);

    if ($httpCode === 200) {
        echo 'success';
    } else {
        if ($data->detail){
        echo $data->detail;
       } else {
        echo $data;
       }
    }
 
 
?>