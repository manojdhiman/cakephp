<?php
/**
 * 
 * ClientEngage: ClientEngage Project Platform (http://www.clientengage.com)
 * Copyright 2012, ClientEngage (http://www.clientengage.com)
 *
 * You must have purchased a valid license from CodeCanyon in order to have 
 * the permission to use this file.
 * 
 * You may only use this file according to the respective licensing terms 
 * you agreed to when purchasing this item on CodeCanyon.
 * 
 * 
 * 
 *
 * @author          ClientEngage <contact@clientengage.com>
 * @copyright       Copyright 2012, ClientEngage (http://www.clientengage.com)
 * @link            http://www.clientengage.com ClientEngage
 * @since           ClientEngage - Project Platform v 1.0
 * 
 */
?>
<div class="installation form">
    <?php
    $testing = true;

    echo $this->Html->image('common/logo-clientengage-large.png', array('alt' => 'ClientEngage Logo', 'style' => 'margin-bottom: 25px;'));
    ?>
    <ul class="breadcrumb">
        <li><strong>Installation Steps:</strong></li>
        <li class="active">Requirements <span class="divider">/</span></li>
        <li class="muted">Database Setup <span class="divider">/</span></li>
        <li class="muted">Database Initialisation <span class="divider">/</span></li>
        <li class="muted">System Settings <span class="divider">/</span></li>
        <li class="muted">Administrator <span class="divider">/</span></li>
        <li class="muted">Finalisation <span class="divider">/</span></li>
        <li class="muted">Completed</li>
    </ul>

    <div class="progress">
        <div class="bar" style="width: 0%; color: #000;">0%</div>
    </div>

    <hr />

    <?php
    $continueInstallation = true;

    if ($testing && is_writable(TMP))
    {
        echo '<div class="alert alert-success keepopen"><h4><i class="ico-tick"></i> ' . __('Your temporary directory is writable.') . '</h4><code style="color: #468847;">' . TMP . '</code></div>';
    }
    else
    {
        $continueInstallation = false;
        echo '<div class="alert alert-error keepopen"><h4><i class="ico-error"></i> ' . __('Your temporary directory is not writable.') . '</h4>'
        . __('Please make the following path writable: ') . '<br /><code>' . TMP . '</code></div>';
    }

    if ($testing && is_writable(APP . 'Config' . DS))
    {
        echo '<div class="alert alert-success keepopen"><h4><i class="ico-tick"></i> ' . __('Your configuration directory is writable.') . '</h4><code style="color: #468847;">' . APP . 'Config' . DS . '</code></div>';
    }
    else
    {
        $continueInstallation = false;
        echo '<div class="alert alert-error keepopen"><h4><i class="ico-error"></i> ' . __('Your configuration directory is not writable.') . '</h4>'
        . __('Please make the following path writable: ') . '<br /><code>' . APP . 'Config' . DS . '</code></div>';
    }

    if ($testing && is_writable(APP . 'Config' . DS . 'security-core.php'))
    {
        echo '<div class="alert alert-success keepopen"><h4><i class="ico-tick"></i> ' . __('Your security configuration is writable.') . '</h4><code style="color: #468847;">' . APP . 'Config' . DS . 'security-core.php</code></div>';
    }
    else
    {
        $continueInstallation = false;
        echo '<div class="alert alert-error keepopen"><h4><i class="ico-error"></i> ' . __('Your security configuration is not writable.') . '</h4>'
        . __('Please make the following path writable: ') . '<br /><code>' . APP . 'Config' . DS . 'security-core.php</code></div>';
    }

    if ($testing && is_writable(UPLOADBASE))
    {
        echo '<div class="alert alert-success keepopen"><h4><i class="ico-tick"></i> ' . __('Your upload directory is writable.') . '</h4><code style="color: #468847;">' . UPLOADBASE . '</code></div>';
    }
    else
    {
        $continueInstallation = false;
        echo '<div class="alert alert-error keepopen"><h4><i class="ico-error"></i> ' . __('Your upload directory is not writable.') . '</h4>'
        . __('Please make the following path writable: ') . '<br /><code>' . UPLOADBASE . '</code></div>';
    }

    if ($testing && version_compare(PHP_VERSION, '5.2.8', '>='))
    {
        echo '<div class="alert alert-success keepopen"><h4><i class="ico-tick"></i> ' . sprintf(__('The PHP version running on your server (%s) fulfills the minimum requirement (5.2.8).'), phpversion()) . '</h4></div>';
    }
    else
    {
        $continueInstallation = false;
        echo '<div class="alert alert-error keepopen"><h4><i class="ico-error"></i> ' . sprintf(__('The PHP version running on your server (%s) does not fulfill the minimum requirement (5.2.8).'), phpversion()) . '</h4>'
        . __('') . '</div>';
    }

    if ($testing && extension_loaded('pdo') && extension_loaded('pdo_mysql'))
    {
        echo '<div class="alert alert-success keepopen"><h4><i class="ico-tick"></i> ' . __('The PDO extensions are loaded.') . '</h4></div>';
    }
    else
    {
        $continueInstallation = false;
        echo '<div class="alert alert-error keepopen"><h4><i class="ico-error"></i> ' . __('The necessary PDO extensions are not loaded.') . '</h4>'
        . __('Please enable the PHP PDO extension as well as the MySQL PDO extension. You may have to ask your hosting-provider to enable these.') . '</div>';
    }
    ?>
<?php if ($continueInstallation): ?>
        <div class="terms-conditions">
            <p>This is the end-user license agreement for the ClientEngage Project Platform (hereafter referred to as
                SOFTWARE PRODUCT).<br />
                <br />
                Please read the terms and conditions of this license agreement carefully before
                continuing with this installation: ClientEngage's End-User License Agreement ("EULA")
                is a legal agreement between you (either an individual or a single entity) and
                ClientEngage for this software product.</p>
            <ul>
                <li>You must have purchased a valid license from CodeCanyon in order to have the
                    permission to use this file.</li>

                <li>You may only use this software according to the respective licensing terms you
                    agreed to when purchasing this item on CodeCanyon.</li>
            </ul>
            <p><h4>1. Description of Other Rights and Limitations.</h4>
            <h5>(a) Support Services.</h5>
            ClientEngage may provide you with support services related to the SOFTWARE PRODUCT
            ("Support Services"). Any supplemental software code provided to you as part of the
            Support Services shall be considered part of the SOFTWARE PRODUCT and subject to the
            terms and conditions of this EULA.<br />
            <h5>(b) Compliance with Applicable Laws.</h5>
            You must comply with all applicable laws regarding use of the SOFTWARE PRODUCT.</p>

            <p><h4>2. No Warranties</h4>
            ClientEngage expressly disclaims any warranty for the SOFTWARE PRODUCT. The SOFTWARE
            PRODUCT is provided 'As Is' without any express or implied warranty of any kind,
            including but not limited to any warranties of merchantability, noninfringement, or
            fitness of a particular purpose. ClientEngage does not warrant or assume
            responsibility for the accuracy or completeness of any information, text, graphics,
            links or other items contained within the SOFTWARE PRODUCT. ClientEngage further
            expressly disclaims any warranty or representation to Authorized Users or to any
            third party.</p>

            <p><h4>3. Limitation of Liability</h4>
            In no event shall ClientEngage be liable for any damages (including, without
            limitation, lost profits, business interruption, or lost information) rising out of
            'Authorized Users' use of or inability to use the SOFTWARE PRODUCT, even if
            ClientEngage has been advised of the possibility of such damages. In no event will
            ClientEngage be liable for loss of data or for indirect, special, incidental,
            consequential (including lost profit), or other damages based in contract, tort or
            otherwise. ClientEngage shall have no liability with respect to the content of the
            SOFTWARE PRODUCT or any part thereof, including but not limited to errors or
            omissions contained therein, libel, infringements of rights of publicity, privacy,
            trademark rights, business interruption, personal injury, loss of privacy, moral
            rights or the disclosure of confidential information.</p>

            <hr/>

            <h3>Third Party Components: Credits</h3>
            <p>This application was made possible with the help of various third party components. For a list of attributions, please see below.</p>
            <hr/>

            <h3>CakePHP</h3>
            <p>
                This application was built using the amazing CakePHP framework.<br />
                <strong>License:</strong> MIT License <br />
                <strong>Path:</strong> <code>lib\Cake\LICENSE.txt</code> <br />
                <strong>Website:</strong> <a href="http://www.cakephp.org" target="_blank">http://www.cakephp.org</a> <br />
            </p>
            <hr />
            <h3>Twitter Bootstrap</h3>
            <p>
                Many of this application's visual aspects were made possible by using the Twitter Bootstrap framework.<br />
                <strong>License:</strong> Apache License v2.0 <br />
                <strong>Path:</strong> <code>app\webroot\css\bootstrap\LICENSE</code> <br />
                <strong>Website:</strong> <a href="http://twitter.github.com/bootstrap/" target="_blank">http://twitter.github.com/bootstrap/</a> <br />
            </p>
            <hr />

            <h3>jQuery</h3>
            <p>
                Many aspects of the user interaction logic use jQuery.<br />
                <strong>License:</strong> MIT License <br />
                <strong>Path:</strong> <code>app\webroot\js\jquery\MIT-LICENSE.txt</code> <br />
                <strong>Website:</strong> <a href="http://jquery.com/" target="_blank">http://jquery.com/</a> <br />
            </p>
            <hr />

            <h3>jQuery UI</h3>
            <p>
                jQuery UI was used to provide advanced user interface elements.<br />
                <strong>License:</strong> MIT License <br />
                <strong>Path:</strong> <code>app\webroot\js\jquery\jqueryui\MIT-LICENSE.txt</code> <br />
                <strong>Website:</strong> <a href="http://jqueryui.com/" target="_blank">http://jqueryui.com/</a> <br />
            </p>
            <hr />

            <h3>famfamfam Icons</h3>
            <p>
                A subset of the amazingly brilliant famfamfam icon set was included in this application.<br />
                <strong>License:</strong> Creative Commons Attribution 2.5 License <br />
                <strong>Path:</strong> <code>app\webroot\img\icons\readme.txt</code> <br />
                <strong>Website:</strong> <a href="http://www.famfamfam.com/" target="_blank">http://www.famfamfam.com/</a> <br />
            </p>
            <hr />


            <h3>jQuery Color Picker</h3>
            <p>
                This application also uses the wonderful jQuery Colorpicker plugin.<br />
                <strong>License:</strong> MIT License <br />
                <strong>Path:</strong> <code>app\webroot\js\jquery\colorpicker\MIT-LICENSE.txt</code> <br />
                <strong>Website:</strong> <a href="http://www.eyecon.ro/" target="_blank">http://www.eyecon.ro/</a> <br />
            </p>
            <hr />


            <h3>jQuery blockUI plugin</h3>
            <p>
                blockUI provides some great functionality to prevent form re-submissions.<br />
                <strong>License:</strong> MIT License <br />
                <strong>Path:</strong> <code>app\webroot\js\jquery\plugins\MIT-LICENSE.txt</code> <br />
                <strong>Website:</strong> <a href="http://malsup.com/jquery/block/" target="_blank">http://malsup.com/jquery/block/</a> <br />
            </p>
            <hr />


            <h3>CakePHP Upload Plugin</h3>
            <p>
                This application uses the Upload Plugin for CakePHP to manage the file uploading.<br />
                <strong>License:</strong> MIT License <br />
                <strong>Path:</strong> <code>app\Plugin\Upload\README.markdown</code> <br />
                <strong>Website:</strong> <a href="https://github.com/josegonzalez/upload/" target="_blank">https://github.com/josegonzalez/upload/</a> <br />
            </p>
            <hr />


            <h3>CakePHP Migrations Plugin</h3>
            <p>
                This application's update procedure is made possible by using the CakePHP Migrations Plugin.<br />
                <strong>License:</strong> MIT License <br />
                <strong>Path:</strong> <code>app\Plugin\Migrations\readme.txt</code> <br />
                <strong>Website:</strong> <a href="https://github.com/CakeDC/migrations/" target="_blank">https://github.com/CakeDC/migrations/</a> <br />
            </p>
            <hr />


            <h3>CakePHP ListBehavior & SlugBehavior</h3>
            <p>
                This application makes use of the ListBehavior and SlugBehavior which are part of the Utils Plugin. These have been placed in a separate plugin. If you wish to use the original Utils Plugin, then please be sure to download the full version from the author's website.<br />
                <strong>License:</strong> MIT License <br />
                <strong>Path:</strong> <code>app\Plugin\Utility\Model\Behavior\license.txt</code> <br />
                <strong>Website:</strong> <a href="http://cakedc.com" target="_blank">http://cakedc.com</a> <br />
            </p>
            <hr />


            <h3>TinyMCE</h3>
            <p>
                The fantastic TinyMCE editor was used to allow users to format comments.<br />
                <strong>License:</strong> LGPL License <br />
                <strong>Path:</strong> <code>app\webroot\js\tiny_mce\license.txt</code> <br />
                <strong>Website:</strong> <a href="http://www.tinymce.com/" target="_blank">http://www.tinymce.com/</a> <br />
            </p>
            <hr />

            <h3>FullCalendar</h3>
            <p>
                The amazing FullCalendar plugin for jQuery was used for the calendar feature.<br />
                <strong>License:</strong> MIT License <br />
                <strong>Path:</strong> <code>app\webroot\js\fullcalendar\MIT-LICENSE.txt</code> <br />
                <strong>Website:</strong> <a href="http://arshaw.com/fullcalendar/" target="_blank">http://arshaw.com/fullcalendar/</a> <br />
            </p>
            <hr />

            <h3>jQuery chosen</h3>
            <p>
                The chosen plugin is used to make client & recipietn selections much more user friendly.<br />
                <strong>License:</strong> MIT License <br />
                <strong>Path:</strong> <code>app\webroot\js\jquery\chosen\LICENSE.md</code> <br />
                <strong>Website:</strong> <a href="https://github.com/harvesthq/chosen/" target="_blank">https://github.com/harvesthq/chosen/</a> <br />
            </p>
            <hr />

        </div>
        <?php
        echo $this->Form->create(null);
        echo $this->Form->input('eula_agreed', array('label' => __('I agree to the above terms.'), 'type' => 'checkbox'));
        echo $this->Form->button(__('Begin Installation'), array('class' => 'btn btn-primary btn-large'));
        echo $this->Form->end();
        ?>
<?php else: ?>
    <?php
    echo '<div class="alert alert-error"><h4><i class="ico-cancel"></i> ' . __('Unfortunately, the installation cannot proceed due to the minimum requirements not being met.') . '</h4>'
    . __('') . '</div>';
    ?>
<?php endif; ?>
</div>
