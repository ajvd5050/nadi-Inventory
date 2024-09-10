package com.cpi.is.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.cpi.is.entity.UserEntity;
import com.cpi.is.service.impl.BranchServiceImpl;
import com.cpi.is.service.impl.UserServiceImpl;

import org.json.JSONArray;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Servlet implementation class UserController
 */
@WebServlet("/UserController")
public class UserController extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	private static String action = "";
	private static String page = "";
	
	private ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
	private UserServiceImpl userService = (UserServiceImpl) context.getBean("userService");
	private BranchServiceImpl branchService = (BranchServiceImpl) context.getBean("branchService");
    
	
	/**
     * @see HttpServlet#HttpServlet()
     */
    public UserController() {
        super();
    }

	/**
	 * @throws IOException 
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			action = request.getParameter("action");
			
			if ("login".equals(action)) {
				UserEntity user = userService.authenticate(request);
				
				if (user != null) {
					// set user cookie
					Cookie cookie = new Cookie("user", user.getUsername());
					cookie.setMaxAge(24*60*60);
					response.addCookie(cookie);
					
					// set user session
					HttpSession session = request.getSession();
					session.setAttribute("user", user);
					session.setAttribute("branchId", user.getBranchId()); // Store branchId in session
                    session.setAttribute("branchId", user.getBranchId()); // Store branchId in session
					request.setAttribute("username", user.getUsername());
					page = "pages/navbar/menu.jsp";
				} else {
					request.setAttribute("message", "Invalid Username or Password");
					page = "pages/message.jsp";
				}
			} else if ("logout".equals(action)) {
				// destroy user cookie
				Cookie cookie = new Cookie("user", "");
				cookie.setMaxAge(0);
				response.addCookie(cookie);
				
				// invalidate user session
				HttpSession session = request.getSession();
				session.invalidate();
				
				page = "pages/login.jsp";
			} else if ("checkUserSession".equals(action)) {
				request.setAttribute("message", "No existing user session");
				page = "pages/message.jsp";
				
				HttpSession session = request.getSession();
				UserEntity user = (UserEntity) session.getAttribute("user");
				
				if (user != null) {
					request.setAttribute("username", user.getUsername());
					page = "pages/navbar/menu.jsp";
				} else {
					Cookie[] cookies = request.getCookies();
					if (cookies != null) {
						for (Cookie cookie : cookies) {
							if (cookie.getName().equals("user")) {
								request.setAttribute("username", cookie.getValue());
								page = "pages/navbar/menu.jsp";
								break;
							}
						}
					}
				}
			} else if ("showRegisterPage".equals(action)) {
				JSONArray test = new JSONArray(branchService.getBranch());
				System.out.println(test);
				request.setAttribute("branches", test );
				page="pages/registration.jsp";
			} else if ("registerNewUser".equals(action)) {
				request.setAttribute("message", userService.registerNewUser(request));
				page = "pages/message.jsp";
			}
			
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			System.out.println(page);
			request.getRequestDispatcher(page).forward(request, response);
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
