package com.pangong.harper.resources;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

import javax.portlet.PortletException;
import javax.portlet.ResourceRequest;
import javax.portlet.ResourceResponse;

import org.osgi.service.component.annotations.Component;

import com.github.kevinsawicki.http.HttpRequest;
import com.github.kevinsawicki.http.HttpRequest.HttpRequestException;
import com.liferay.portal.kernel.portlet.bridges.mvc.MVCResourceCommand;
import com.liferay.portal.kernel.util.PropsUtil;

@Component(
		immediate = true,
		property = {
			"javax.portlet.name=com_pangong_harper_portlet_AngularPortlet",
			"mvc.command.name=/pangong/harperForm"
		},
		service = MVCResourceCommand.class
	)
public class HarperFormService implements MVCResourceCommand {
	
	private static final String userName = PropsUtil.get(Constants.USERNAME);
	private static final String password = PropsUtil.get(Constants.PASSWORD);
	
	private StringWriter insertOrUpdatePatientAttributes(String postBody) {
		StringWriter sw = new StringWriter();

		try {
			HttpRequest.post(Constants.SERVERURL).basic(userName, password)
					   .accept(Constants.JSON).contentType(Constants.JSON).send(postBody).receive(sw);
		} catch (HttpRequestException e) {
			e.printStackTrace();
			sw.write("DataBase connection not successful.  Please ensure that database is started");
		}
		return sw;
	}

	@Override
	public boolean serveResource(ResourceRequest resourceRequest, ResourceResponse resourceResponse)
			throws PortletException {

		
		PrintWriter writer;
		StringWriter sw = null;
		
		try {
		
			BufferedReader reader = resourceRequest.getReader();
			String line = null;
			StringBuffer sb = new StringBuffer();
			while ((line = reader.readLine()) != null)
		    {
				sb.append(line);
		    }
			
			String form = sb.toString();
			
			String postBody = Constants.insertQuery.replaceAll("%FORM%", form);
			sw = insertOrUpdatePatientAttributes(postBody);
			
			
			
			if (sw.toString().contains("error")) {
				postBody = Constants.updateQuery.replaceAll("%FORM%", form);
				sw = insertOrUpdatePatientAttributes(postBody);
			}
			
			System.out.println("Hello" + postBody);
			System.out.println(sw.toString());
			
			writer = resourceResponse.getWriter();
			
			writer.print(sw);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return true;
	}

}
